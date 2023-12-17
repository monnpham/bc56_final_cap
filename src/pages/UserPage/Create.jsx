import { Editor } from '@tinymce/tinymce-react';
import { Form, Input, Layout } from "antd";
import React, { useEffect, useRef, useState } from 'react'
import { projectService, userService } from '../../services/service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CREATE_PROJECT } from '../../redux/constant/user';

export default function Create() {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const createProject = {
        "projectName": "",
        "description": "",
        "categoryId": "1",
        "alias": ""
    }

    const editorRef = useRef(null);
    const [arrcategory, setArrCategory] = useState();
    useEffect(() => {
        userService
            .getProjectCategory()
            .then((res) => {
                setArrCategory(res.data.content);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handelEditorChange = (content) => {
        console.log("content:", content)
        createProject.description = content;
        return createProject.description
    }

    const handelChangeCategory = (event) => {
        console.log("handelChangeCategory:", event.target.value)
        return createProject.categoryId = event.target.value;
    }
    const handelChange = (event) => {
        console.log("handelChange:", event.target.value)
        return createProject.projectName = event.target.value;
    }

    const onFinish = (values) => {
        console.log(createProject)
        if (values.categoryId === undefined) values.categoryId = "1"
        if (values.description === undefined) values.description
            = createProject.description
        if (values.description !== "")
            userService
                .postCreateProject(values)
                .then((res) => {
                    console.log(res);
                    dispatch({ type: CREATE_PROJECT, payload: res.data.content });
                    localStorage.setItem("PROJECT", JSON.stringify(res.data.content));
                    toast.success("Tạo Project Thành Công");
                    navigate("/user/Create");
                })
                .catch((err) => {
                    toast.error("Project name already exists");
                    console.log(err.content);
                });
        else toast.error("Tạo Project Thất Bại!\n Bạn cần viết Description");

    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
        console.log(createProject)
    };
    return (
        <div className='container m-5'>
            <h3 style={{ fontWeight: "700", fontSize: "28px" }}>Create Project</h3>
            <Layout>
                <content>
                    <Form
                        className='container'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <p>Name</p>
                        <Form.Item
                            name="projectName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Name Project!",
                                },
                            ]}
                        >
                            <Input className="py-2" onChange={handelChange} />
                        </Form.Item>
                        {/* <div className="form-group mt-12">
                            <p>Name</p>
                            <input
                                onChange={handelChange}
                                className='form-control'
                                name='projectName'
                            />
                        </div> */}
                        <>

                            <p>Description</p>

                            <Editor
                                onInit={(editor) => editorRef.current = editor}
                                initialValue=""
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist autolink lists link image charmap print preview anchor',
                                        'searchreplace visualblocks code fullscreen',
                                        'insertdatetime media table paste code help wordcount'
                                    ],
                                    toolbar: 'undo redo | formatselect | ' +
                                        'bold italic backcolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                                onEditorChange={handelEditorChange}
                            />

                            <Form.Item
                                name="description"
                            >
                            </Form.Item>

                        </>
                        <Form.Item
                            className="form-group my-3"
                            name="categoryId"
                        >
                            <select name='categoryId' className='form-control' onchange={handelChangeCategory}>
                                {arrcategory?.map((item, index) => {
                                    return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                                }
                                )}

                            </select>
                        </Form.Item>
                        <button className="button btn btn-outline-primary" type='submit'>Create Project</button >
                    </Form>
                </content>

            </Layout>

        </div >
    )

}
