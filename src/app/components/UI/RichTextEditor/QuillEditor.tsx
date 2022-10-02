import React from 'react';
import ReactQuill, { Quill, ReactQuillProps } from 'react-quill';

let qFont = Quill.import('formats/font');
qFont.whitelist = ['Battambang', 'Khmer', 'Moul'];
Quill.register(qFont, true);

const QuillEditor = ({ ...props }: ReactQuillProps) => {
  return (
    <ReactQuill
      theme="snow"
      modules={{
        toolbar: [[{ font: ['Battambang', 'Khmer', 'Moul'] }], [{ align: [] }], ['bold', 'italic', 'underline']],
      }}
      formats={['font', 'bold', 'italic', 'underline']}
      {...props}
    />
  );
};

export default QuillEditor;
