import {Cloudinary, cloudinary} from '@cloudinary/url-gen';
import {AdvanceImage} from '@cloudinary/react';
import dotenv form 'dotenv';

const cloudinary = New Cloudinary({
    cloud: {
        cloudName: process.env.CLOUD_NAME
    }
});
