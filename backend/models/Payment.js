const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: [true, 'Booking is required']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required']
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'],
    required: [true, 'Payment method is required']
  },
  paymentStatus: {
    type: String,
    enum: ['initiated', 'processing', 'completed', 'failed', 'refunded'],
    default: 'initiated'
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true
  },
  paymentGatewayResponse: mongoose.Schema.Types.Mixed,
  paidAt: {
    type: Date
  },
  refundedAt: {
    type: Date
  },
  refundAmount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

paymentSchema.index({ booking: 1 });
paymentSchema.index({ user: 1 });
paymentSchema.index({ transactionId: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
