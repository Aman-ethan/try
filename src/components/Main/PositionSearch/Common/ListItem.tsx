import { List } from "antd";

export default function ListItem() {
  return (
    <List
      itemLayout="vertical"
      size="large"
      // pagination={{
      //   onChange: (page) => {
      //     console.log(page);
      //   },
      //   pageSize: 3,
      // }}
      // dataSource={data}
      renderItem={() => (
        <List.Item
          // key={item.title}
          extra={
            <div>
              <h1>Extra</h1>
            </div>
          }
        >
          <h1>Content</h1>
        </List.Item>
      )}
    />
  );
}
