import prisma from "../../config/prisma";
import { assertStockAvailable } from "../stock/stock.allocation";

export class PrescriptionError extends Error {
  statusCode = 400;
}

export const createPrescription =
  async (data: any) => {

    if (!data?.consultation_id || !Array.isArray(data.items) || data.items.length === 0) {
      throw new PrescriptionError(
        "consultation_id and at least one item are required"
      );
    }

    return prisma.$transaction(
      async (tx) => {

        // Create prescription
        const prescription =
          await tx.prescription.create({
            data: {

              consultation_id:
                data.consultation_id,

              total_amount:
                data.total_amount,
            },
          });

        // Loop through items
        for (const item of data.items) {

          // Create prescription item
          await tx.prescriptionItem.create({
            data: {

              prescription_id:
                prescription.prescription_id,

              drug_id:
                item.drug_id,

              drug_name:
                item.drug_name,

              dosage:
                item.dosage,

              instruction_1:
                item.instruction_1,

              instruction_2:
                item.instruction_2,

              instruction_3:
                item.instruction_3,

              frequency:
                item.frequency,

              duration:
                item.duration,

              quantity:
                item.quantity,

              price:
                item.price,

              is_outside_drug:
                item.is_outside_drug,
            },
          });

          // If this item is an outside drug, also record it in the OutsideDrug table
          if (item.is_outside_drug) {
            // cast tx to any because generated prisma client may not include the new model until client is regenerated
            await (tx as any).outsideDrug.create({
              data: {
                consultation_id: data.consultation_id,
                prescription_id: prescription.prescription_id,
                drug_name: item.drug_name,
                instructions: item.instruction_1 || item.instruction_3 || null,
                quantity: item.quantity || 1,
                price: item.price || 0,
              },
            });
          }

          // Outside drugs are bought elsewhere, so they never touch clinic stock
          if (item.is_outside_drug || !item.drug_id) {
            continue;
          }

          const requested = Number(item.quantity) || 0;

          if (requested <= 0) {
            throw new PrescriptionError(
              `Invalid quantity for ${item.drug_name}`
            );
          }

          // Stock is only checked here; it is deducted when the invoice is finalized
          // (the patient may still decline to buy the medicines).
          await assertStockAvailable(tx, item.drug_id, requested, item.drug_name);
        }

        return prescription;
      }
    );
  };

export const getPrescription =
  async (prescriptionId: number) => {

    return prisma.prescription.findUnique({
      where: {
        prescription_id:
          prescriptionId,
      },

      include: {

        items: true,

        consultation: {
          include: {
            patient: true,
          },
        },
      },
    });
  };

export const listPrescriptions = async (currentUser?: { userId: number; role: string }) => {
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

  return prisma.prescription.findMany({
    where,
    include: {
      consultation: {
        include: {
          patient: true,
          doctor: { select: { user_id: true, name: true } },
          diagnoses: true
        }
      },
      items: true,
      invoice: true
    },
    orderBy: {
      created_at: "desc"
    }
  });
};