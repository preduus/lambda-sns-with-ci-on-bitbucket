'use strict';

var AWS = require("aws-sdk");

/**
 * Can be returned from the database
 */
function getToSend(limit=false) {
  numbers = [
    {
      to: '115588484884480',
      body: 'Hello! You receive an SMS sended by AWS SNS'
    },
    {
      to: '115588484884481',
      body: 'Hello! You receive an SMS sended by AWS SNS'
    },
    {
      to: '115588484884482',
      body: 'Hello! You receive an SMS sended by AWS SNS'
    },
    {
      to: '115588484884483',
      body: 'Hello! You receive an SMS sended by AWS SNS'
    },
    {
      to: '115588484884484',
      body: 'Hello! You receive an SMS sended by AWS SNS'
    }
  ]

  if (limit && limit > 0) {
    numbers = numbers.slice(0, limit)
  }

  return numbers
}

function send(notification) {
  return new Promise(async (resolve, reject) => {
    const sns = new AWS.SNS({ apiVersion: '2010-03-31' })

    sns.setSMSAttributes({
      attributes: {
        DefaultSMSType: 'Transactional'
      },
      function(error) {
        if (error) reject(error)
      }
    })

    const params = {
      PhoneNumber: notification.to,
      Message: notification.body,
      MessageStructure: 'string'
    }

    sns.publish(params, (err, data) => {
      if (err) { reject(err) }
      resolve()
    })
  })
}

module.exports.notify = async event => {
  
  try {
    const notifications = await getToSend(false);

    if (notifications !== undefined && notifications.length > 0) {
      console.log(`Sending ${notifications.length} SMS`)

      for (let index = 0; index < notifications.length; index++) {
        const notification = notifications[index];

        await send(notification)
          .then(() => {
            /** Execute anything */
            console.log(`Sent to: ${notification.to}`)
          })
          .catch(err => {
            console.log(`Could not send. ${notification.to}`)
            console.error(err)
          })
      }
    } else {
      console.log('No SMS to send.')
    }
  } catch (error) {
    console.error(error)
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
        message: 'All right!'
    })
  };

};
