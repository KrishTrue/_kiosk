import mongoose from 'mongoose';

const helpTicketSchema = new mongoose.Schema({
	subject: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ['open', 'in-progress', 'resolved', 'closed'],
		default: 'open'
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

const HelpTicket = mongoose.model('HelpTicket', helpTicketSchema);
export default HelpTicket;