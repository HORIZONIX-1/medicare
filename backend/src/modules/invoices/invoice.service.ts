import prisma from "../../config/prisma";

export const createInvoice =
  async (data: any) => {

  return prisma.invoice.create({
    data: {

      consultation_id:
        data.consultation_id,

      prescription_id:
        data.prescription_id,

      total_drug_cost:
        data.total_drug_cost,

      doctor_fee:
        data.doctor_fee,

      discount:
        data.discount,

      total_amount:
        data.total_amount,

      is_patient_denied:
        data.is_patient_denied,
    },
  });
};

export const finalizeInvoice =
  async (invoiceId: number) => {

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
        throw new Error(
          "Invoice not found"
        );
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

          const batch =
            await tx.stockBatch.findFirst({
              where: {
                drug_id: item.drug_id,
              },

              orderBy: {
                expiry_date: "asc",
              },
            });

          if (batch) {

            await tx.stockBatch.update({
              where: {
                stock_batch_id:
                  batch.stock_batch_id,
              },

              data: {
                quantity: {
                  decrement:
                    item.quantity,
                },
              },
            });
          }
        }
      }

      // finalize invoice
      return tx.invoice.update({
        where: {
          invoice_id: invoiceId,
        },

        data: {
          is_finalized: true,
          finalized_at: new Date(),
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

  if (currentUser && (currentUser.role === "DOCTOR" || currentUser.role === "RECEPTIONIST" || currentUser.role === "DISPENSER")) {
    const user = await prisma.user.findUnique({
      where: { user_id: currentUser.userId },
      select: { organization_id: true }
    });
    organizationId = user?.organization_id ?? null;
  }

  const where: any = {};
  if (organizationId !== null) {
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
          doctor: true
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