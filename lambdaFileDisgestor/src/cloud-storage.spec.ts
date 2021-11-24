import { CloudStorage } from "./cloud-storage";
import { S3 } from 'aws-sdk';
import { Readable } from 'stream'

function makeS3ObjectMock() : S3 {
    return {
        getObject: jest.fn(),
        upload: jest.fn()
    } as unknown as S3
}

function makeSut() {
    const s3Mock = makeS3ObjectMock()
    const sut = new CloudStorage(s3Mock)
    return {
        sut,
        s3Mock
    }
}

describe('CloudStorage', () => {
    it('should return data stream from s3 object', async () => {
        const { sut, s3Mock } = makeSut();
        const objectReadable = new Readable();
        const params = { Bucket: 'valid_Bucket', Key: 'valid_key' };
        
        jest.spyOn(s3Mock, 'getObject').mockReturnValue(({
            createReadStream: () => {
                return objectReadable;
            }
        }) as unknown as never) 

        const stream = await sut.getStreamFrom(params);

        expect(stream).toBe(objectReadable);
        expect(s3Mock.getObject).toHaveBeenCalledWith(params);
    })
})