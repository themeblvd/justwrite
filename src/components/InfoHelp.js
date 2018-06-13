import React from 'react';
import ReactMarkdown from 'react-markdown';
import content from '../info/help.md';

const InfoHelp = () => {
  return <ReactMarkdown source={content} />;
};

export default InfoHelp;
