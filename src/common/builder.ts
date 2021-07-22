export default {
  response: (transactionId:string, source:string, statusCode: string, data:any) => {
    return {
      metaData: {
        statusCode: statusCode,
        transactionId: transactionId ? transactionId : '',
        source: source ? source : ''
      },
      payloadData: data
    }
  }
}