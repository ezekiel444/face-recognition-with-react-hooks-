import React from "react";
import "./Imagelinkform.css";

function ImageLinkForm({ onChangeHandle, onSubmitPicture }) {
  return (
    <div>
      <p className="f3">
        {"This magic brain will detect faces and your picture. Give it a try."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            type="text"
            onChange={onChangeHandle}
            className="f4 pa2 center w-70 "
          />
          <button
            onClick={onSubmitPicture}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

export default ImageLinkForm;
