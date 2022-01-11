import { useFormik } from 'formik';
import React, { ReactElement, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { createAricle } from '../../../apis/service';
import { ArticleModalFormAddDTO } from '../../../interface';

interface Props {
    type: string,
    reLoad: () => void
}

export default function ArticleForm({ type, reLoad }: Props): ReactElement {

    const navigate = useNavigate();

    const [editorContent, setEditorContent] = useState('')
    const handleChange = (content: string) => {
        setEditorContent(content);
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            content: '',
            cover: '',
            categoryId: 1,
        },
        onSubmit: async (values) => {
            const authorId = 1;
            const article: ArticleModalFormAddDTO = {
                ...values,
                content: editorContent,
                authorId: authorId
            }            
            await createAricle(article);
            navigate('/admin')
            reLoad();
        },
    });

    return (
        <div>
            <h2 className='text-center'>Create New</h2>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        id="title"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={4}
                        name="description"
                        id="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image Cover</Form.Label>
                    <Form.Control
                        type="text"
                        name="cover"
                        id="cover"
                        onChange={formik.handleChange}
                        value={formik.values.cover}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Catagory</Form.Label>
                    <Form.Control
                        type="text"
                        name="categoryId"
                        id="categoryId"
                        onChange={formik.handleChange}
                        value={formik.values.categoryId}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <SunEditor
                        name="content"
                        onChange={handleChange}
                        setContents={formik.values.content}
                        setDefaultStyle="font-family: Arial; font-size: 14px;"

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
                                // ['save', 'template'],
                                // ['dir', 'dir_ltr', 'dir_rtl'] // "dir": Toggle text direction, "dir_ltr": Right to Left, "dir_rtl": Left to Right
                            ],
                        }}
                    />
                </Form.Group>
                <Button type="submit" className='my-2'>Post</Button>
            </Form>
        </div>
    )
}
