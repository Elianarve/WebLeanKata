import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../components/layout";
import Home from "../pages/home/Home";
import Edit from "../components/edit/Edit";
import Card from "../components/card/Card";
import Challenge from '../components/forms/Challenge';
import ActualState from "../components/forms/ActualState";
import TargetState from "../components/forms/TargetState";
import Obstacle from "../components/forms/Obstacle";
import ContrastMental from "../components/forms/ContrastMental";
import Hypothesis from "../components/forms/Hypothesis";
import Experiment from "../components/forms/Experiment";
import Task from '../components/forms/Task';
import Result from "../components/forms/Result";
import Learning from "../components/forms/Learning";

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
      path: "/reto",
      element: <Challenge/>,
    },
    {
      path: "/actualstate",
      element: <ActualState/>,
    },
    {
      path: "/targetstate",
      element: <TargetState/>,
    },
    {
      path: "/obstacle",
      element: <Obstacle/>,
    },
    {
      path: "/contrast",
      element: <ContrastMental/>
    },
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
      path: "/Edit/:id",
      element: <Edit/>
    },
    {
      path: "/card/:id",
      element: <Card/>
    },
  ],
  }
  ]);

export default router;