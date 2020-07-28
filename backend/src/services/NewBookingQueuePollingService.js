const AWS = require('aws-sdk');
const { Consumer } = require('sqs-consumer');
const bookingController = require('../controllers/BookingController');

// Configure the region
AWS.config.update({region: 'us-east-1'});

const queueURL = "https://sqs.eu-west-1.amazonaws.com/128363080680/RESTaurant-NewBooking.fifo"

const SQSConsumer = Consumer.create({
  queueUrl: queueURL,
  handleMessage: async (message) => {
    bookingController.createFromQueue(message);
    console.log('Received Message. Processing...');
  },
  sqs: new AWS.SQS()
});

SQSConsumer.on('error', (err) => {
  console.error(err.message);
});

SQSConsumer.on('processing_error', (err) => {
  console.error(err.message);
});

console.log('New Booking Queue Polling service is running');
SQSConsumer.start();