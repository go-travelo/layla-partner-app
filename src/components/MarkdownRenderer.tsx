import React, { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

const MarkdownRenderer = ({ markdown }: { markdown: string }) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    const convertMarkdown = async () => {
      const html = await markdownToHtml(markdown);
      setHtmlContent(html);
    };

    // noinspection JSIgnoredPromiseFromCall
    convertMarkdown();
  }, [markdown]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }}/>
  );
};

export default MarkdownRenderer;