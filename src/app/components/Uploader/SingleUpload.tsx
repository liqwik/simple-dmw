import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import { AppStorage } from 'utils/storage';
import { ImageUtil } from 'utils/imageUtil';
import { UploadButton } from 'app/components/UI/Button';
import { UPLOADING, DONE } from 'utils/constants';
import { APIBase } from 'config';

function SingleUpload(props) {
  const { label, imgSrc, opts, onUpload } = props;

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    setPreview(imgSrc);
  }, [imgSrc]);

  const handleChange = info => {
    if (info.file.status === UPLOADING) {
      setPreview('');
      setLoading(true);
      return;
    }

    if (info.file.status === DONE) {
      const { format, url, fileName } = info.file.response;

      ImageUtil.getBase64(info.file.originFileObj, imageBase64 => {
        setPreview(imageBase64);
      });

      onUpload({
        url,
        format,
        filename: fileName,
      });
    }
    setLoading(false);
  };

  const uploadProps = Object.assign(
    {
      name: 'files',
      listType: 'picture-card',
      className: 'avatar-uploader',
      showUploadList: false,
      action: `${APIBase}/v1/ul/img`,
      headers: {
        authorization: `Bearer ${AppStorage.getUserToken()}`,
      },
      beforeUpload: ImageUtil.beforeUpload,
      onChange: handleChange,
    },
    opts,
  );

  return (
    <div>
      <p style={{ marginBottom: '5px' }}>{label}</p>
      <Upload {...uploadProps}>
        {preview ? (
          <img src={preview} alt="avatar" style={{ width: '100%' }} />
        ) : (
          <UploadButton loading={loading} />
        )}
      </Upload>
    </div>
  );
}

export default SingleUpload;
