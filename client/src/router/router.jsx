import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../components/layout/LayoutPublic";
import Home from "../pages/home/Home";
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
import EditActualState from "../components/edit/EditActualState";
import EditChallenge from "../components/edit/EditChallenge";
import EditExperiment from "../components/edit/EditExperiment";
import EditTask from "../components/edit/EditTask";
import EditResult from "../components/edit/EditResult";
import EditTargetState from "../components/edit/EditTargetState";
import EditMentalContrast from '../components/edit/EditContrastMental';
import EditHypothesis from '../components/edit/EditHypothesis';
import Process from '../components/forms/Process';
import Tribe from '../components/forms/Tribe';

import EditObstacle from '../components/edit/EditObstacle';
import EditLearning from '../components/edit/EditLearning';
import Detail from "../components/detail/Detail";

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
    // {
    //   path: "/tribe",
    //   element: <Tribe/>
    // },
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
      path: "/card/:id",
      element: <Card/>
    },
    {
      path: "/detail/:id",
      element: <Detail/>
    },
    {
      path:"/editActualState/:id",
      element: <EditActualState/>
    },
    {
      path:"/editlearning/:id",
      element: <EditLearning/>
    },
    {
      path: "/editobstacle/:id",
      element: <EditObstacle/>
    },
    {
      path:"/editresult/:id",
      element: <EditResult/>
    },
    {
      path:"/edittargetstate/:id",
      element: <EditTargetState/>
    },
    {
      path:"/edittask/:id",
      element: <EditTask/>
    },
    {
      path: "/editchallenge/:id",
      element: <EditChallenge/>
    },
    {
      path: "/editexperiment/:id",
      element: <EditExperiment/>
    },
    {
      path: "/editcontrastmental/:id",
      element: <EditMentalContrast/>
    },
    {
      path: "/edithypothesis/:id",
      element: <EditHypothesis/>
    },
    {
      path: "/editHypothesis/:id",
      element: <EditHypothesis/>
    },
  ],
  }
  ]);

export default router;