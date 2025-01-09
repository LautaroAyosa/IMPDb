import React, { useEffect } from 'react';
import $ from 'jquery';

const AutoExpandTextarea = ({className, placeholder, value, onChange, id, name, disabled}) => {
  useEffect(() => {
    // Apply jQuery code here
    $('textarea').on('input', function () {
      $(this).css('height', 'auto');
      $(this).css('height', `${this.scrollHeight}px`);
    });

    // Clean up to prevent memory leaks
    return () => {
      $('textarea').off('input');
    };
  }, []); // Empty dependency array ensures it runs once on mount

  return <textarea className={className} placeholder={placeholder} value={value} onChange={onChange} id={id} name={name} disabled={disabled} />;
};

export default AutoExpandTextarea;
