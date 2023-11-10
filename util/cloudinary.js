import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dlr9keice',
  api_key: '645629856326964',
  api_secret: '5TAsAz4g_wksgo9SvPf0ijeY29A',
});

cloudinary.v2.uploader.upload(
  'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
  { public_id: 'olympic_flag' },
  function (error, result) {
    console.log(result);
  },
);
