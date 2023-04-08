import { useState } from "react";
import { Button, Table } from "antd";

import {MemberForm} from "./MemberForm";

function Memebers({ members, project, reloadData, isUserAdminOrOwner }) {
  const [selectedMember, setSelectedMember] = useState(null);
  const [showMemberForm, setShowMemberForm] = useState(false);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Roles",
      dataIndex: "roles",
      
    },
    {
      title: "Added On",
      dataIndex: "addedOn",
      
    },
    {
      title: "Action",
      dataIndex: "action",
     
    },
  ];
  // if user is project owner or admin then only show the action column
 
  return (
    <div className="flex flex-col gap-5">
    
        <div className="flex justify-end">
          <Button>
            Add Member
          </Button>
        </div>
    
      <Table
        columns={columns}
       
      />
      {showMemberForm && (
        <MemberForm
          show={showMemberForm}
          setShow={setShowMemberForm}
        
          
        />
      )}
    </div>
  );
}

export default Memebers;
