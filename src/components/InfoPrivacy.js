import React from 'react';
import ReactMarkdown from 'react-markdown';
import content from '../info/privacy.md';

const InfoPrivacy = () => {
    return <ReactMarkdown source={content} />;
};

export default InfoPrivacy;
