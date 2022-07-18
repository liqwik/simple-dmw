import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload, Modal } from 'antd';
import { ImageUtil } from 'utils/imageUtil';
import { APIBase } from 'config';
import MarkAsCover from './MarkAsCover';
import { AppStorage } from 'utils';

function MultipleUpload({ previewImage, previewVisible, files, onCancel, onChange, onPreview }: any) {
  const [fileList, setFileList]: any = useState([]);

  useEffect(() => {
    setFileList(files);
  }, [files]);

  const handleChange = info => {
    if (Array.isArray(info)) {
      return info;
    }
    const fList = [...info.fileList];

    const newFList = fList.map(file => {
      if (file.response) {
        return {
          uid: file.uid,
          status: file.status,
          url: file.response.url,
          format: file.response.format,
          filename: file.response.fileName,
        };
      }

      return file;
    });

    setFileList(newFList);
    onChange(newFList);
  };

  return (
    <div className="clearfix">
      <Upload
        action={`${APIBase}/v1/ul/img`}
        headers={{ authorization: `Bearer ${AppStorage.getUserToken()}` }}
        name="files"
        listType="picture-card"
        multiple={true}
        fileList={fileList || null}
        beforeUpload={ImageUtil.beforeUpload}
        onPreview={onPreview}
        onChange={handleChange}
        itemRender={(originalNode, file, currFileList) => {
          return (
            <MarkAsCover
              file={file}
              fileList={currFileList}
              originalNode={originalNode}
              onMarkAsCover={selectedCover => {
                onChange(
                  currFileList.map((f: any) => {
                    f.markAsCover = f.filename === selectedCover.filename;
                    return f;
                  }),
                );
              }}
            />
          );
        }}
      >
        {fileList && fileList.length >= 8 ? null : (
          <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
          </div>
        )}
      </Upload>

      <Modal visible={previewVisible} footer={null} onCancel={onCancel}>
        <img alt="product" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  );
}

export default MultipleUpload;
