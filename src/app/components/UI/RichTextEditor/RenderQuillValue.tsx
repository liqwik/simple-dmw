import React from 'react';
import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html';

const RenderQuillValue = ({ content }) => {
  if (content && content.startsWith('{')) {
    const delta = JSON.parse(content);

    const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
    const html = converter.convert();

    return <div dangerouslySetInnerHTML={{ __html: html }} className="ql-editor" />;
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default RenderQuillValue;
