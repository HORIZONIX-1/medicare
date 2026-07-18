const prisma = require("../../../config/prisma");

const asyncHandler = (handler) => (req, res, next) => {
  Promise.resolve(handler(req, res, next)).catch(next);
};

const getActorId = (req) => req.user?.id || req.admin?.user?.id || null;

const createTicket = asyncHandler(async (req, res) => {
  const actorId = getActorId(req);
  
  if (!actorId) {
    res.status(401).json({ success: false, message: "Unauthorized access" });
    return;
  }

  const { subject, message } = req.body;

  const ticket = await prisma.supportTicket.create({
    data: {
      subject,
      message,
      status: "OPEN",
      user_id: Number(actorId),
    },
  });

  res.status(201).json({
    success: true,
    message: "Support ticket submitted successfully",
    data: {
      id: ticket.ticket_id,
      subject: ticket.subject,
      status: ticket.status,
      createdAt: ticket.created_at,
    },
  });
});

module.exports = {
  createTicket,
};
