import React, { useState, useEffect, useRef } from 'react';
import { StyledCKEditor } from './internals/styled';

// const subTextCopy = 'Drag and drop or upload any images';
export interface CkEditorFiveProps {
  csrfToken?: string;
  data?: string;
  onChange?: (val: string) => void;
  onClose?: () => void;
  showEditorMenu?: boolean;
  isSlimmerVersion?: boolean;
  isUicAtBottom?: boolean;
  setCkEditorData: (data: any) => void;
}

const baseEditorConfiguration = {
  placeholder: `What's your question?`,
  toolbar: {
    items: [
      '|',
      'bold',
      'italic',
      'superscript',
      'subscript',
      'insertTable',
      '|',
      'numberedList',
      'bulletedList',
      '|',
      'blockQuote',
      'codeBlock',
      '|',
      'undo',
      'redo',
    ],
    shouldNotGroupWhenFull: true,
  },
  language: 'en',
  image: {
    resizeOptions: [
      {
        name: 'resizeImage:original',
        value: null,
        icon: 'original',
      },
      {
        name: 'resizeImage:50',
        value: '50',
        icon: 'medium',
      },
    ],
    toolbar: [
      'imageStyle:inline',
      'imageStyle:block',
      'resizeImage:50',
      'resizeImage:original',
    ],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
};

/**
 * Ckeditor 5 Wrapper Component
 */
const Editor: React.FC<CkEditorFiveProps> = ({
  // csrfToken,
  data,
  // onChange,
  showEditorMenu,
  setCkEditorData,
}) => {
  const editorRef = useRef({
    CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
    ClassicEditor: require('@chegg/ck-editor-five'),
  });
  const [editorLoaded, setEditorLoaded] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  // TODO implement handle image upload error
  const handleError = (evt: any): void => {
    // setModalState({
    //   name: ModalNames.PAQ_ERROR_STATES,
    //   props: {
    //     errorMessage: data,
    //     onClose: onClose,
    //   },
    // });
    evt.stop();
  };

  const onEditorReady = (editor: any): void => {
    const notifications = editor.plugins.get('Notification');
    // Handle errors
    notifications.on('show:warning', handleError);
    // Set height of editor
    editor.editing.view.change((writer: any) => {
      writer.setStyle(
        'height',
        '300px',
        editor.editing.view.document.getRoot(),
      );
    });
  };
  const onEditorChange = (event: any, editor: any): void => {
    const data = editor.getData();
    // console.log('Data', data)
    // onChange(data);
    setCkEditorData(data);
  };

  //   const extraPlugins = [
  //     (editor: any) => ImageUploadAdapterPlugin(editor, csrfToken),
  //   ];
  const editorConfiguration = { ...baseEditorConfiguration };
  if (!editorLoaded) {
    return null;
  }

  return (
    <StyledCKEditor showEditorMenu={showEditorMenu}>
      <CKEditor
        editor={ClassicEditor}
        data={data}
        onReady={onEditorReady}
        onChange={onEditorChange}
        onBlur={() => {
          //TODO Analyics events
        }}
        onFocus={() => {
          //TODO Analyics events
        }}
        config={editorConfiguration}
      />
    </StyledCKEditor>
  );
};

export default Editor;