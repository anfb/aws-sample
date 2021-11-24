import { S3 } from 'aws-sdk';
import { GetObjectRequest } from 'aws-sdk/clients/s3';
import { Readable } from 'stream'

export class CloudStorage {
    s3: S3
    
    constructor(s3: S3 = new S3({ apiVersion: '2006-03-01', maxRetries: 0 })){
        this.s3 = s3;
    }

    public getStreamFrom(params: GetObjectRequest): Readable {
        return this.s3.getObject(params).createReadStream();
    }

}