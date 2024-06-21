import React, { useEffect, useState } from "react";
import { Button, Divider, Popconfirm } from "antd";
import {
  EditableProTable,
  ProCard,
  ProColumns,
  ProFormField,
} from "@ant-design/pro-components";
import { DeleteOutlined, TableOutlined } from "@ant-design/icons";
import { LocalOptionLeg, OptionLeg, defaultData } from "./utils";
import { ProfitChart } from "./ProfitChart";
import { ProfitCards } from "./ProfitCards";

export function OptionsTable() {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map(({ id }) => id)
  );
  const [dataSource, setDataSource] = useState<readonly LocalOptionLeg[]>(
    () => defaultData
  );

  const [dataSourceCleaned, setDataSourceCleaned] = useState<OptionLeg[]>(
    () => defaultData as OptionLeg[]
  );

  useEffect(() => {
    setEditableRowKeys(dataSource.map(({ id }) => id));
    setDataSourceCleaned(
      dataSource.filter(
        ({ ask, bid, long_short, strike_price, type }) =>
          ask !== undefined &&
          ask !== undefined &&
          bid !== undefined &&
          long_short !== undefined &&
          strike_price !== undefined &&
          type !== undefined
      ) as OptionLeg[]
    );
  }, [dataSource]);

  const requiredField = {
    formItemProps: {
      rules: [
        {
          required: true,
        },
      ],
    },
  };

  const columns: ProColumns<LocalOptionLeg>[] = [
    {
      title: "Note",
      dataIndex: "note",
      valueType: "text",
    },
    {
      title: "Strike",
      dataIndex: "strike_price",
      valueType: "digit",
      sorter: (a, b) => (a.strike_price ?? 0) - (b.strike_price ?? 0),
      ...requiredField,
    },
    {
      title: "Type",
      dataIndex: "type",
      valueType: "select",
      valueEnum: {
        call: { text: "Call" },
        put: {
          text: "Put",
        },
      },
      filters: [
        {
          text: "Call",
          value: "Call",
        },
        {
          text: "Put",
          value: "Put",
        },
      ],
      onFilter: (value, record) => record.type?.indexOf(value as string) === 0,
      ...requiredField,
    },
    {
      title: "Bid",
      dataIndex: "bid",
      valueType: "digit",
      sorter: (a, b) => (a.bid ?? 0) - (b.bid ?? 0),
      ...requiredField,
    },
    {
      title: "Ask",
      dataIndex: "ask",
      valueType: "digit",
      sorter: (a, b) => (a.ask ?? 0) - (b.ask ?? 0),
      ...requiredField,
    },
    {
      title: "Position",
      dataIndex: "long_short",
      valueType: "select",
      valueEnum: {
        short: "Short",
        long: "Long",
      },
      filters: [
        {
          text: "Short",
          value: "short",
        },
        {
          text: "Long",
          value: "long",
        },
      ],
      onFilter: (value, record) =>
        record.long_short?.indexOf(value as string) === 0,
      ...requiredField,
    },
    {
      title: "Actions",
      valueType: "option",
    },
  ];

  return (
    <>
      <ProfitChart options={dataSourceCleaned} />
      <Divider />
      <ProfitCards options={dataSourceCleaned} />
      <Divider />
      <EditableProTable<LocalOptionLeg>
        headerTitle="Options"
        scroll={{
          x: 960,
        }}
        columns={columns}
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={{
          newRecordType: "dataSource",
          creatorButtonText: "Add an Option",
          record: () => ({
            id: Date.now(),
          }),
        }}
        toolBarRender={() => [
          <Popconfirm
            title="Delete all the options and replace with an example?"
            onConfirm={() => setDataSource(defaultData)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<TableOutlined />}>Try example</Button>
          </Popconfirm>,
          <Popconfirm
            title="Delete all the options?"
            onConfirm={() => setDataSource([])}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />}>Delete all</Button>
          </Popconfirm>,
        ]}
        editable={{
          type: "multiple",
          editableKeys,
          actionRender: (row, config, defaultDoms) => [defaultDoms.delete],
          onValuesChange: (record, recordList) => setDataSource(recordList),
          onChange: setEditableRowKeys,
        }}
      />
      <ProCard title="JSON data" headerBordered collapsible defaultCollapsed>
        <ProFormField
          ignoreFormItem
          fieldProps={{
            style: {
              width: "100%",
            },
          }}
          mode="read"
          valueType="jsonCode"
          text={JSON.stringify(dataSource)}
        />
      </ProCard>
    </>
  );
}
