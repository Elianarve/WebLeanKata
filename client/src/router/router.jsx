import { createBrowserRouter } from "react-router-dom";
import LayoutPublic from "../components/layout";
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
import EditChallenge from "../components/edit/EditChallenge";
import EditActualState from "../components/edit/EditActualState";
import EditExperiment from "../components/edit/EditExperiment";
// import EditTask from "../components/edit/EditTask";
// import EditResult from "../components/edit/EditResult";
// import EditLearning from "../components/edit/EditLearning";
import EditMentalContrast from "../components/edit/EditMentalContrast";
// import EditHypothesis from "../components/edit/EditHypothesis";

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
      path: "/obstacle",
      element: <Obstacle/>,
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
      path:"/editActualState/:id",
      element: <EditActualState/>
    },
    {
      path: "/editChallenge/:id",
      element: <EditChallenge/>
    },
    {
      path: "/editExperiment/:id",
      element: <EditExperiment/>
    },
    // {
    //   path: "/editTask/:id",
    //   element: <EditTask/>
    // },
    // {
    //   path: "/editResult/:id",
    //   element: <EditResult/>
    // },
    // {
    //   path: "/editLearning/:id",
    //   element: <EditLearning/>
    // },
    {
      path: "/editContrastMental/:id",
      element: <EditMentalContrast/>
    },
    // {
    //   path: "/editHypothesis/:id",
    //   element: <EditHypothesis/>
    // },
  ],
  }
  ]);

export default router;