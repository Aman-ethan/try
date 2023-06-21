"use client";

import { Radio } from "antd";

export default function ClientDetailsView(){
    return(
        <div className="py-5">
            <Radio.Group size="large">
                <Radio.Button value="goals">Goals</Radio.Button>
                <Radio.Button value="estate">Estate</Radio.Button>
                <Radio.Button value="bank accounts">Bank Accounts</Radio.Button>
            </Radio.Group>
        </div>
    )
}