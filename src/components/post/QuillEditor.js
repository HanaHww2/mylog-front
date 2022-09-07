import React, { useMemo, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.custom.css';
import { uploadImage } from '../../api/Api';
import ImageBlot from './ImageBlot';

//Quill.register(ImageBlot);

const QuillEditor = (props) => {
  const quillRef = useRef();

  // 에디터에서 제공하는 인터페이스 활용
  // useState를 사용할 수도 있지만, 렌더링이 계속 발생하는 점이 좋지 않은 것 같다.
  const onChangeHandler = (html) => {
    props.editorContentHandler(html);
  };

  // 이미지 업로드 전략 변경할까?
  // 참고자료: https://developer-lte.tistory.com/entry/react-quill-editor-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%97%85%EB%A1%9C%EB%93%9C-%EB%AC%B8%EC%A0%9C-%EC%9E%91%EC%84%B1%EC%A4%91
  // 글 작성이 완료된 이후에 이미지를 업로드하기 -> 태그의 src를 replace해서 저장하기?
  // 깃헙도 이미지 백엔드에 전달하고 url 바로 바꿔주는데... 그냥 이대로가 낫지 않을까? 고민 중
  // base64로 화면에 표출하고, 배열로 파일들을 관리한다면, 정말로 이미지를 지웠을 때 문제가 될 것 같기도 하다.
  const imageHandler = () => {
    // file input 임의 생성
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', true);
    input.click();

    input.onchange = async () => {
      const files = input.files;
      if (!files) return;

      console.log(files);
      const formData = new FormData();
      Array.from(files).forEach((file, idx) => {
        formData.append(`imgFiles`, file);
      });

      // file 데이터 담아서 서버에 전달하여 이미지 업로드
      const res = await uploadImage(formData);
      console.log(res);

      const quillEditor = quillRef.current.getEditor();
      let range = quillEditor.getSelection(true);
      Array.from(res.data).forEach((item) => {
        console.log(item);
        // 에디터에 파일 첨부
        quillEditor.insertEmbed(
          range.index,
          'image',
          'http://localhost:8080/images/' + item.filename,
          // 'imageBlot',
          // {
          //   src: 'http://localhost:8080/images/' + item.filename,
          //   id: props.tempImgFileArr.length + 1,
          // },
          // Quill.sources.USER,
        );
        // 사용자 편의를 위해 커서 이미지 오른쪽으로 이동
        quillEditor.setSelection(range.index + 1);
        quillEditor.focus();
        props.tempImgFileArrHandeler(item);
      });
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image'],
          ['clean'],
        ],

        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'clean',
  ];

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      style={{ height: '70vh' }}
      modules={modules}
      formats={formats}
      onChange={onChangeHandler}
      //value={content}
    />
  );
};

export default QuillEditor;
