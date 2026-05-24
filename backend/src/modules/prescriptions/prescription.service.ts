import prisma from "../../config/prisma";

export const createPrescription =
  async (data: any) => {

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

          const totalAvailable =
            await tx.stockBatch.aggregate({
              where: {
                drug_id: item.drug_id,
              },

              _sum: {
                quantity: true,
              },
            });

          const available =
            totalAvailable._sum.quantity || 0;

          if (available < item.quantity) {

            throw new Error(
              `${item.drug_name} stock not enough`
            );
          }
          
          // Reduce stock
          if (
            !item.is_outside_drug &&
            item.drug_id
          ) {

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