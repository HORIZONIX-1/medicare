import prisma from "../../config/prisma";
import { deductStock } from "../stock/stock.allocation";

export class InvoiceError extends Error {
  constructor(message: string, public statusCode = 400) {
    super(message);
  }
}

export const createInvoice =
  async (data: any) => {

  if (!data?.consultation_id) {
    throw new InvoiceError("consultation_id is required");
  }

  const invoiceData = {
    prescription_id:
      data.prescription_id ?? null,

    total_drug_cost:
      Number(data.total_drug_cost) || 0,

    doctor_fee:
      Number(data.doctor_fee) || 0,

    discount:
      Number(data.discount) || 0,

    total_amount:
      Number(data.total_amount) || 0,

    is_patient_denied:
      Boolean(data.is_patient_denied),
  };

  const existing =
    await prisma.invoice.findUnique({
      where: { consultation_id: data.consultation_id },
    });

  if (existing?.is_finalized) {
    throw new InvoiceError(
      "An invoice for this visit has already been finalized",
      409
    );
  }

  // A previous attempt created the invoice but did not finalize it; update it instead of failing
  if (existing) {
    return prisma.invoice.update({
      where: { invoice_id: existing.invoice_id },
      data: invoiceData,
    });
  }

  return prisma.invoice.create({
    data: {
      consultation_id:
        data.consultation_id,
      ...invoiceData,
    },
  });
};

export const finalizeInvoice =
  async (invoiceId: number, actorUserId?: number | null) => {

  return prisma.$transaction(
    async (tx) => {

      const invoice =
        await tx.invoice.findUnique({
          where: {
            invoice_id: invoiceId,
          },

          include: {
            prescription: {
              include: {
                items: true,
              },
            },
          },
        });

      if (!invoice) {
        throw new InvoiceError(
          "Invoice not found",
          404
        );
      }

      // Atomically claim the invoice so concurrent/duplicate finalize calls
      // can never deduct stock a second time
      const claimed =
        await tx.invoice.updateMany({
          where: {
            invoice_id: invoiceId,
            is_finalized: false,
          },

          data: {
            is_finalized: true,
            finalized_at: new Date(),
          },
        });

      if (claimed.count === 0) {
        return tx.invoice.findUnique({
          where: { invoice_id: invoiceId },
        });
      }

      // deduct stock ONLY if patient bought medicines and a prescription exists
      if (!invoice.is_patient_denied && invoice.prescription) {

        for (
          const item of invoice
            .prescription.items
        ) {

          if (
            item.is_outside_drug ||
            !item.drug_id
          ) {
            continue;
          }

          await deductStock(tx, item.drug_id, item.quantity, item.drug_name, actorUserId);
        }
      }

      return tx.invoice.findUnique({
        where: {
          invoice_id: invoiceId,
        },
      });
    }
  );
};

export const getInvoice = async (invoiceId: number) => {
  return prisma.invoice.findUnique({
    where: { invoice_id: invoiceId },
    include: {
      consultation: { include: { patient: true } },
      prescription: { include: { items: true } },
    },
  });
};

export const listInvoices = async (currentUser?: { userId: number; role: string }) => {
  let organizationId: number | null = null;
  // Staff only see their own organization (users without one only see unaffiliated records)
  let scoped = false;

  if (currentUser && (currentUser.role === "DOCTOR" || currentUser.role === "RECEPTIONIST" || currentUser.role === "DISPENSER")) {
    const user = await prisma.user.findUnique({
      where: { user_id: currentUser.userId },
      select: { organization_id: true }
    });
    organizationId = user?.organization_id ?? null;
    scoped = true;
  }

  const where: any = {};
  if (scoped) {
    where.consultation = {
      doctor: {
        organization_id: organizationId
      }
    };
  }

  return prisma.invoice.findMany({
    where,
    include: {
      consultation: {
        include: {
          patient: true,
          doctor: { select: { user_id: true, name: true, email: true } }
        }
      },
      prescription: {
        include: {
          items: true
        }
      }
    },
    orderBy: {
      created_at: "desc"
    }
  });
};