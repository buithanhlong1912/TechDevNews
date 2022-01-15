import { useFormik } from 'formik';
import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';
import { createAricle, editArticlesById, getArticlesId } from '../../../apis/service';
import { ArticleDetailDTO, ArticleModal, ArticleModalFormAddDTO, IAdmin } from '../../../interface';
import { getAdminFromLocal } from '../../../utilities';

interface Props {
    type: string,
    reLoad: () => void
}

interface IValidateForm {
    title: string,
    description: string,
    cover: string,
}

export default function ArticleForm({ type, reLoad }: Props): ReactElement {

    const navigate = useNavigate();
    const [editorContent, setEditorContent] = useState('')
    const handleChange = (content: string) => {
        setEditorContent(content);
    }

    const admin: IAdmin = getAdminFromLocal();

    const validate = (values: IValidateForm) => {
        const errors = {} as IValidateForm;
        if (!values.title) {
            errors.title = 'You need fill title of article!';
        }
        if (!values.description) {
            errors.description = 'You need fill description of article!';
        }

        if (!values.cover) {
            errors.cover = 'You need fill image cover of article!';
        }
        return errors;
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            content: '',
            cover: '',
            categoryId: 1,
        },
        validate,
        onSubmit: async (values) => {
            const authorId = admin.id;
            const article: ArticleModalFormAddDTO = {
                ...values,
                content: editorContent,
                authorId: authorId,
                categoryId: Number(values.categoryId)
            }

            if (type === 'create') {
                await createAricle(article);
            }
            else {
                const articleClone: ArticleDetailDTO = { ...article } as ArticleDetailDTO;
                const { user, ...rest } = articleClone;
                await editArticlesById(rest)
            }
            navigate('/admin')
            reLoad();
        },
    });


    const [aricleById, setAricleById] = useState<ArticleDetailDTO>({} as ArticleDetailDTO)

    const { id } = useParams();

    const findArticleById = async (id: string | undefined) => {
        const data = await getArticlesId(id);
        setAricleById(data);
    }

    useEffect(() => {
        findArticleById(id);
    }, [])

    useEffect(() => {
        if (aricleById) {
            formik.setValues(aricleById);
        }
    }, [aricleById])


    return (
        <div>
            <h2 className='text-center'>{type === 'create' ? 'Create New' : 'Edit New'}</h2>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        id="title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                    />
                    {formik.errors.title && formik.touched.title ?
                        <Form.Text className="mx-2 text-danger">
                            {formik.errors.title}
                        </Form.Text>
                        :
                        null}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={4}
                        name="description"
                        id="description"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.description}
                    />
                    {formik.errors.description && formik.touched.description ?
                        <Form.Text className="mx-2 text-danger">
                            {formik.errors.description}
                        </Form.Text>
                        :
                        null}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Image Cover</Form.Label>
                    <Form.Control
                        type="text"
                        name="cover"
                        id="cover"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.cover}
                    />
                    {formik.errors.cover && formik.touched.cover ?
                        <Form.Text className="mx-2 text-danger">
                            {formik.errors.cover}
                        </Form.Text>
                        :
                        null}
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Catagory</Form.Label>
                    <Form.Select
                        name='categoryId'
                        className="mb-3"
                        value={formik.values.categoryId}
                        onChange={formik.handleChange}
                    >
                        <option value="1">Lập trình</option>
                        <option value="2">UI/UX</option>
                        <option value="3">Block Chain</option>
                        <option value="4">Mobile</option>
                        <option value="5">Internet</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control
                        type="text"
                        disabled
                        value={type === 'create' ? admin.info.name : aricleById?.user?.info?.name}
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
                <Button type="submit" className='my-2'>{type === 'create' ? "Post" : "Update"}</Button>
            </Form>
        </div>
    )
}
