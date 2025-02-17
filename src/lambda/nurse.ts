"use strict";
import AWS from "aws-sdk";
var dynamodb = require('serverless-dynamodb-client');
var docClient = dynamodb.doc;

AWS.config.update({
  region: process.env.region
});
import NurseTable from "../aws/nurseTable";
import Validator from "../util/validator";

export namespace Nurse {

  //@ts-ignore TS6133: 'event, context' is declared but its value is never read.
  export async function getNurses(event: any, context: any, callback: Function) {
    const nurseTable = new NurseTable(docClient);
    const validator = new Validator();
    try {
      const res = await nurseTable.getNurses();
      if (validator.checkDyanmoQueryResultEmpty(res)) {
        const errorModel = {
          errorCode: "RPM00001",
          errorMessage: "Not Found",
        };
        callback(null, {
          statusCode: 404,
          body: JSON.stringify({
            errorModel,
          }),
        });
      }
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      });
    } catch (err) {
      console.log("getNurseTable-index error");
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        }),
      });
    }
  }

  //@ts-ignore TS6133: 'event, context' is declared but its value is never read.
  export async function postNurse(event: any, context: any, callback: Function) {
    console.log('called postNurse');
    const nurseTable = new NurseTable(docClient);
    const validator = new Validator();
    const bodyData = validator.jsonBody(event.body);
    try {
      if (!validator.checkNurseBody(bodyData)) {
        const errorModel = {
          errorCode: "RPM00002",
          errorMessage: "Invalid Body",
        };
        callback(null, {
          statusCode: 400,
          body: JSON.stringify({
            errorModel,
          }),
        });
      }
      const res = await nurseTable.postNurse(bodyData);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      });
    } catch (err) {
      console.log("postNurseTable-index error");
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        }),
      });
    }
  }

  //@ts-ignore TS6133: 'event, context' is declared but its value is never read.
  export async function getNurse(event: any, context: any, callback: Function) {
    const nurseTable = new NurseTable(docClient);
    const validator = new Validator();
    console.log('call getNurse with ' + event.pathParameters.nurseId);
    try {
      const res = await nurseTable.getNurse(event.pathParameters.nurseId);
      console.log(res);
      if (validator.checkDynamoGetResultEmpty(res)) {
        const errorModel = {
          errorCode: "RPM00001",
          errorMessage: "Not Found",
        };
        callback(null, {
          statusCode: 404,
          body: JSON.stringify({
            errorModel,
          }),
        });
      }
      console.log(res);
      console.log(JSON.stringify(res));
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      });
    } catch (err) {
      console.log("getNurseTable-index error");
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        }),
      });
    }
  }

  //@ts-ignore TS6133: 'event, context' is declared but its value is never read.
  export async function putNurse(event: any, context: any, callback: Function) {
    const nurseTable = new NurseTable(docClient);
    const validator = new Validator();
    const bodyData = validator.jsonBody(event.body);
    try {
      if (!validator.checkNurseBody(bodyData)) {
        const errorModel = {
          errorCode: "RPM00002",
          errorMessage: "Invalid Body",
        };
        callback(null, {
          statusCode: 400,
          body: JSON.stringify({
            errorModel,
          }),
        });
      }
      const res = await nurseTable.putNurse(
        event.pathParameters.nurseId,
        bodyData
      );
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(res),
      });
    } catch (err) {
      console.log("putNurseTable-index error");
      callback(null, {
        statusCode: 500,
        body: JSON.stringify({
          error: err
        }),
      });
    }
  }
}