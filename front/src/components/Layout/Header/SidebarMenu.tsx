import * as React from 'react';
import ApprovalIcon from '@mui/icons-material/Approval';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import GroupIcon from '@mui/icons-material/Group';


export const itemsList = [
  {
    text: "Apply Form",
    icon: <ApprovalIcon />,
    path: '/'
  },
  {
    text: "Level Form",
    icon: <ApprovalIcon />,
    path: '/levelformlists'
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsIcon />,
    path: '/adminlists'
  },
  {
    text: "Exam Users",
    icon: <GroupIcon />,
    path: '/examuserlists'
  },
];