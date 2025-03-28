
// Custom component tagger that adds data attributes to components for debugging
import { createFilter } from '@rollup/pluginutils';

export function customComponentTagger() {
  const fileFilter = createFilter(['**/*.jsx', '**/*.tsx'], 'node_modules/**');
  
  return {
    name: 'custom-component-tagger',
    transform(code, id) {
      if (!fileFilter(id)) return null;
      
      // Don't process files that don't contain React components
      if (!code.includes('React.') && !code.includes('from "react"') && !code.includes("from 'react'")) {
        return null;
      }
      
      try {
        // Extract component name from the file path
        const componentName = id.split('/').pop().split('.')[0];
        
        // Add data-component attribute to JSX elements
        let modifiedCode = code.replace(
          /(<[A-Z][a-zA-Z0-9]*)(\s|>)/g,
          `$1 data-component="${componentName}"$2`
        );
        
        return {
          code: modifiedCode,
          map: null
        };
      } catch (error) {
        console.error(`Error processing ${id}:`, error);
        return null;
      }
    }
  };
}
