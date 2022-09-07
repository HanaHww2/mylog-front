import React, { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { savePost } from '../../api/Api';
import CategorySelector from '../../components/post/CategorySelector';
import QuillEditor from '../../components/post/QuillEditor';
import TagInput from '../../components/post/TagInput';

const EditPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 리스트 페이지에서 보드, 카테고리 정보 필요함
  // edit 페이지로 넘어갈 때 정보 전달 필요
  const params = {
    type: searchParams.get('type'),
    id: searchParams.get('id'),
  };
  let editorContent = { html: '', imgFileArr: [] };
  let tempImgFileArr = [];

  // const boardRef = useRef();
  // const categoryRef = useRef();
  const titleRef = useRef();

  const tempImgFileArrHandeler = (item) => {
    tempImgFileArr = [...tempImgFileArr, item];
  };
  const editorContentHandler = (html) => {
    editorContent = { ...editorContent, html: html };
  };

  // 업로드 된 이미지 배열과 실제로 post 할 글에 남은 이미지들의 배열을 비교하여
  // 작성자가 저장하고자 하는 이미지만 남겨서, db에 저장한다.
  // 이로써 글에 작성되지 않은 이미지 url은 추후 스케줄링을 통해 삭제 처리한다.
  const filterDeletedImgFile = (html, tempImgFileArr) => {
    // html 내에 저장된 img 태그 조회하여 이미지 아이디 배열 생성
    let dom = document.createElement('html');
    dom.innerHTML = html;
    const embededImgArr = Array.from(dom.getElementsByTagName('img')).map(
      (el) => {
        let src = el.src;
        let idx = src.lastIndexOf('/');
        return src.slice(idx + 1);
      },
    );

    // 글 작성 중 지워진 이미지 배열이 있는지 확인하고 새로운 배열 생성
    const filtered = Array.from(tempImgFileArr)
      .filter((item) => embededImgArr.find((em) => em === item.filename))
      .map((item) => {
        if (item.src === embededImgArr[0]) item.isThumbnail = true;
        return item;
      });

    return filtered;
  };

  const categoryHandler = (boardId, categoryId) => {
    if (boardId) editorContent.boardId = boardId;
    if (categoryId) editorContent.categoryId = categoryId;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    editorContent.imgFileArr = filterDeletedImgFile(
      editorContent.html,
      tempImgFileArr,
    );

    console.log(editorContent);

    const postBody = {
      boardId: editorContent.boardId,
      categoryId: editorContent.categoryId,
      title: titleRef.current.value,
      content: editorContent.html,
      imgList: editorContent.imgFileArr,
      tagList: [],
    };
    console.log(postBody);

    try {
      const res = await savePost(postBody);
      console.log(res.message);
      navigate(`/${res.data.title}`, {
        ///${boardName}/${categoryName}
        replace: true,
        state: { ...res.data },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="editor-section">
      <form onSubmit={handleSubmit}>
        <CategorySelector categoryHandler={categoryHandler} />
        <div>
          <input
            type="text"
            className="input-title mb-normal"
            ref={titleRef}
            name="title"
            placeholder="title"
          />
        </div>
        <div>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div>
          <QuillEditor
            // editorContent={editorContent}
            editorContentHandler={editorContentHandler}
            // tempImgFileArr={tempImgFileArr}
            tempImgFileArrHandeler={tempImgFileArrHandeler}
          />
        </div>
        <div className="bottom-container">
          <TagInput />
          <div className="left-button-area">
            <button onClick={() => navigate(-1)}>cancel</button>
            <button>temp-save</button>
            <button>submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
