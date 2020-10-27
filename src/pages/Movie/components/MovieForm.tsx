import React from 'react';
import { useQuery } from '@apollo/client';
import { Form, Input, Select } from 'antd';

import GET_DIRECTOR_LIST from '../../../graphql/director/getDirectorList';

import { DirectorType } from '../../../utils/types';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;

type PropsType = {
  onFinish: () => void,
  form: FormInstance,
}

export default (props: PropsType) => {
  const { onFinish, form } = props;

  const { data: directorList } = useQuery(GET_DIRECTOR_LIST);
  const directors = directorList && directorList.directors;

  return (
    <Form name="movie" onFinish={onFinish} layout="vertical" form={form}>
      <Form.Item label="Name:" name="name" rules={[{ required: true, message: 'Please input name!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Genre:" name="genre" rules={[{ required: true, message: 'Please input genre!' }]}>
        <Input />
      </Form.Item>

      <Form.Item label="Director:" name="directorId" rules={[{ required: true, message: 'Please input director!' }]}>
        <Select>
          {
            directors && directors.map((el: DirectorType) => <Option key={el.id} value={el.id}>{el.name}</Option>)
          }
        </Select>
      </Form.Item>
    </Form>   
  );
};
