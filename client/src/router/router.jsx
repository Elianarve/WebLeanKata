import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../components/layout/LayoutPublic";
import Home from "../pages/home/Home";
import Card from "../components/card/Card";
import Challenge from '../components/forms/Challenge';
import ActualState from "../components/forms/ActualState";
import Obstacle from "../components/forms/Obstacle";
import Hypothesis from "../components/forms/Hypothesis";
import Experiment from "../components/forms/Experiment";
import Task from '../components/forms/Task';
import Result from "../components/forms/Result";
import Learning from "../components/forms/Learning";
import EditLearning from '../components/edit/EditLearning';
import EditResult from "../components/edit/EditResult";
import EditTask from "../components/edit/EditTask";
import Process from '../components/forms/Process';
import Tribe from '../components/forms/Tribe';
import EditObstacle from "../components/edit/EditObstacle";


export const router = createBrowserRouter([
  {
      path: "/",
      element: <LayoutPublic />,
      children: [
    {
      index: true,
      element: <Home/>,
    },
    {
      path: "/process",
      element: <Process/>
    },
    {
      path: "/tribe",
      element: <Tribe/>
    },
    {
      path: "/challenge",
      element: <Challenge/>,
    },
    {
      path: "/actualstate",
      element: <ActualState/>,
    },
    {
      path: "/obstacle",
      element: <Obstacle/>,
    },
    // {
    //   path: "/contrast",
    //   element: <ContrastMental/>
    // },
    {
      path: "/hypothesis",
      element: <Hypothesis/>
    },
    {
      path: "/experiment",
      element: <Experiment/>
    },
    {
      path: "/task",
      element: <Task/>
    },
    {
      path: "/result",
      element: <Result/>
    },
    {
      path:"/learning",
      element: <Learning/>
    },
    {
      path:"/editlearning/:id",
      element: <EditLearning/>
    },
    {
      path:"/editresult/:id",
      element: <EditResult/>
    },
    {
      path:"/editobstacle/:id",
      element: <EditObstacle/>
    },
    {
      path:"/edittask/:id",
      element: <EditTask/>
    },
    {
      path: "/card/:id",
      element: <Card/>
    },
  ],
  }
  ]);

export default router;