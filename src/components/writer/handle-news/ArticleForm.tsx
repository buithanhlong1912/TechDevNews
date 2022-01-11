import React, { ReactElement } from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

interface Props {

}

export default function ArticleForm({ }: Props): ReactElement {
    const handleChange = (content: string) => {
        console.log(content); //Get Content Inside Editor
    }

    return (
        <div>
            <SunEditor
                defaultValue="<p>The editor's default value</p>"
                setOptions={{
                    height: '80vh',
                    buttonList: [
                        ['undo', 'redo'],
                        ['font', 'fontSize', 'formatBlock'],
                        ['paragraphStyle', 'blockquote'],
                        ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                        ['fontColor', 'hiliteColor', 'textStyle'],
                        ['removeFormat'],
                        '/', // Line break
                        ['outdent', 'indent'],
                        ['align', 'horizontalRule', 'list', 'lineHeight'],
                        ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                        /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                        ['fullScreen', 'showBlocks', 'codeView'],
                        ['preview', 'print'],
                        ['save', 'template'],
                        // ['dir', 'dir_ltr', 'dir_rtl'] // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
                    ],
                }}
                setDefaultStyle="font-family: Arial; font-size: 12px;"
                onChange={handleChange}
            />
        </div>
    )
}
