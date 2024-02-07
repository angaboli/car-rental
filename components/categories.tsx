import { FaCar } from "react-icons/fa";

const Categorie = () => {


  return <div id="categories" className="py-6 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-200">

    <div className="wrapper  ">
      <div className="max-w-3xl ">
        <div className="inline-flex px-4 py-1.5  rounded-full  ">
          <h2 className="head_text tracking-widest font-light uppercase">Modèles de voitures Correspondant à Vos Critères</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 mt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 lg:mt-20 text-center">
        <a href="#"
          className="transition-all rounded duration-1000 bg-white hover:bg-blue-green  hover:shadow-xl m-2 p-4 relative z-40 group  ">
          <div
            className=" absolute  bg-orange top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  ">
          </div>
          <div className="py-2 px-9 relative  ">
            <img src="/img/suv.png" />
            {/* <svg className="w-16 h-16 fill-gray-400 group-hover:fill-white"
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE1ElEQVR4nO2cS4gdRRSGP8cnGh+giDOTGVAEY4ILwdfKB4gujOgMuHClDBqScWIiGMWlO8GN4ELQ4HPtKBrfRFHURRLUiUgg8YGIGPCtkbkZzbSccIShpmZM973dXXXn/6Dg0vfeqj719+muOnWqQQghhBBCCCGEEEIIIYQQQgghynAccCPwNLAP+BMoEit/A98B7wPbgNF+lfgq4JMEOrwoWeaAR4FV9BH3+JVXZFz2AcP0AXcn0JlFj8pXwGoy5hLgcGDUPPCSP0vO63F7RVCqcII/NzYA+yN12m33NDJlZ2DMX8BtNbZX9ECQhZwMvBCp1y6oATLj2oghd9TcZtFjQfCOfzFS9yNkxnuBAW810GZRgyDGqcCeSP13krF3XJmxIMagz0/CIfF1ZOgdrzXUblGjIMalwKGgjZ+AC0mYtryjCUGMceBIZI5yFpl4x44G2y4aEMR4KNLW2z5kTt47ruhDQYwnI+09ReLe8WrD7RcNCnIi8G6kzSkS9o7L+1gQ42zgQNDmP8B6EvSOV1o4h6JhQYw1wK9Bu3942GhFe0dbghg3RKLZ3wDnkoh3vNzSeRQtCWLcFWn/Q4+Hteod8y15R9uCGI9HzuG5pk/inUS8IwVBbB7yRuQ8bN7SCJdFGldhUR/YzH6X5xLc72tBtazVPyYB6OYC/A342CeZW4HrPYhZmU8lCHXcEX4GPgCe8HwEiyifcyyC/C5BaPIW/YUvjC25rj/f8kM0BwaAC4CbgQd91LXHl7OrCmN5Cg97+CapUU0/CLUeeAB4FtgdWW9ZruwMEy4kSD3ZnecDN7lQz/gIbXYJUd5cmHAhQZrjFOB24OtIv9tQ+igSpHnO8LzjhX1vwc0z7UsJ0g42BD4Y9L8NjyVIi2yLLZXLQ9rjoqD/v7WDEqQ9Tgr6v2MHJUi7LOp/CdIuEiQxJEhiSJB+FmTUF2UsEftLD6od8s92bAswQv8wWoO9PRFkxANmc8cQzZzzZc+c9/WN1Ghv14JY5vgvFVfQxsiP8Zrt7UqQiUgaf5lii2GbyIeJBuytLEhsT4WVz4DNwMW+0GJlLXAvMBP5/ZFMPGW8IXsrCTLku4wW/m7W968vt5N1wLcmd4L//thtZkbNNGlvJUG2R07u6hIGXhM5SUubSZXtDdpbWpChSOV2pZRlU1BHJ1EvGWrY3kX9H94njw/+MBW5h1bZcG//2RvUNUl6TDVo70hkCwQ/BAc3BPvspoPv7YFWlS1BXVZ3akw3ZK+J8XrwvWVA8nzEbZYrNrqoytqSbRUJlCbt3Yg3uFR6Sqx0886p0xPo4KJkacreXQuT5sZLiCJBei/I7tgDf42nSH4fSS/tlQuvS+CKL0qWuuy1VyN+5LepRemkZR5yNiOtyn1BXfaGntSYTt3ecBg4U3EYaMPpzzMc9s6kZu9gZKJkQ+OyTAZ1zNbwNroVY28YSuh4eKDMptKcQyed1OwdjATbOh4e+L9g2+QSwbYUvSMre8eWCEfv9RnpOg9Fr/LPWyP30MLruIX0GcvB3l4s2BydjWbCRA72jvnyZNmTs1vAreTHWA72DvuDL3yfb6wc9ndQWVg7V4ZzsXe1R0N3+CuO/kuL2e/v2dqcebbJSrdXCCGEEEIIIYQQQgghhBBCCCGEIBX+BaZWgpNFZAoEAAAAAElFTkSuQmCC" />
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M7 13.5c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm9 1c0-.276-.224-.5-.5-.5h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5zm4-1c0-.828-.672-1.5-1.5-1.5s-1.5.672-1.5 1.5.672 1.5 1.5 1.5 1.5-.672 1.5-1.5zm-17.298-6.5h-2.202c-.276 0-.5.224-.5.5v.511c0 .793.926.989 1.616.989l1.086-2zm19.318 3.168c-.761-1.413-1.699-3.17-2.684-4.812-.786-1.312-1.37-1.938-2.751-2.187-1.395-.25-2.681-.347-4.585-.347s-3.19.097-4.585.347c-1.381.248-1.965.875-2.751 2.187-.981 1.637-1.913 3.382-2.684 4.812-.687 1.273-.98 2.412-.98 3.806 0 1.318.42 2.415 1 3.817v2.209c0 .552.448 1 1 1h1.5c.552 0 1-.448 1-1v-1h13v1c0 .552.448 1 1 1h1.5c.552 0 1-.448 1-1v-2.209c.58-1.403 1-2.499 1-3.817 0-1.394-.293-2.533-.98-3.806zm-15.641-3.784c.67-1.117.852-1.149 1.39-1.246 1.268-.227 2.455-.316 4.231-.316s2.963.088 4.231.316c.538.097.72.129 1.39 1.246.408.681.81 1.388 1.195 2.081-1.456.22-4.02.535-6.816.535-3.048 0-5.517-.336-6.805-.555.382-.686.779-1.386 1.184-2.061zm11.595 10.616h-11.948c-1.671 0-3.026-1.354-3.026-3.026 0-1.641.506-2.421 1.184-3.678 1.041.205 3.967.704 7.816.704 3.481 0 6.561-.455 7.834-.672.664 1.231 1.166 2.01 1.166 3.646 0 1.672-1.355 3.026-3.026 3.026zm5.526-10c.276 0 .5.224.5.5v.511c0 .793-.926.989-1.616.989l-1.086-2h2.202z" /></svg>
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="polo-tshirt">
            <path d="m16.962 5.841 3.582.717-.716-4.115zM12.172 2.443l-.716 4.115 3.582-.717z">
            </path>
            <path
              d="M28.488 7.301a5.354 5.354 0 0 0-2.743-3.305c-.112-.056-2.96-1.2-4.942-1.996l.87 4.987a.52.52 0 0 1-.488.746.535.535 0 0 1-.101-.01L16.5 6.806V12a.5.5 0 1 1-1 0V6.806l-4.583.917a.518.518 0 0 1-.613-.598L11.196 2c-1.982.796-4.828 1.94-4.94 1.996a5.36 5.36 0 0 0-2.75 3.328l-1.492 6.26c-.042.175.01.359.138.486l.608.608a5.487 5.487 0 0 0 3.907 1.618c.196 0 .375-.111.464-.287l1.072-2.145c.013.292.02.584.02.876V28.48c0 .231.153.435.375.499A27.03 27.03 0 0 0 16 30c2.508 0 5.015-.34 7.402-1.022a.52.52 0 0 0 .376-.5V14.74c0-.292.006-.584.019-.876l1.073 2.145a.519.519 0 0 0 .463.287 5.487 5.487 0 0 0 3.907-1.618l.608-.608a.518.518 0 0 0 .138-.487l-1.498-6.282zM17.03 11.5c-.276 0-.505-.224-.505-.5s.219-.5.495-.5h.01a.5.5 0 0 1 0 1zm0-2c-.276 0-.505-.224-.505-.5s.219-.5.495-.5h.01a.5.5 0 0 1 0 1z">
            </path>
          </svg> */}
            <h3 className="mt-8 text-lg font-semibold text-black group-hover:text-white ">SUV
            </h3>
            <p className="mt-4 text-base text-gray-600 group-hover:text-white  ">Amet minim mollit non
              deserunt ullamco est sit aliqua dolor
              do amet sint. Velit officia consequat duis enim velit mollit.</p>
          </div>
        </a>
        <a href="#"
          className="transition-all  duration-1000 bg-white hover:bg-blue-green  hover:shadow-xl m-2 p-4 relative z-40 group  ">
          <div
            className=" absolute  bg-orange top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  ">
          </div>
          <div className="py-2 px-9 relative  ">

            <img src="/img/berline.png" />
            {/*<img src="data:image/png;base64,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" />*/}
            <h3 className="mt-8 text-lg font-semibold text-black group-hover:text-white ">Berline
            </h3>
            <p className="mt-4 text-base text-gray-600 group-hover:text-white  ">Amet minim mollit non
              deserunt ullamco est sit aliqua dolor
              do amet sint. Velit officia consequat duis enim velit mollit.</p>
          </div>
        </a>
        <a href="#"
          className="transition-all  duration-1000 bg-white hover:bg-blue-green  hover:shadow-xl m-2 p-4 relative z-40 group  ">
          <div
            className=" absolute  bg-orange top-0 left-0 w-24 h-1 z-30  transition-all duration-200   group-hover:bg-white group-hover:w-1/2  ">
          </div>
          <div className="py-2 px-9 relative  ">
            <img src="/img/lux.png" />
            <h3 className="mt-8 text-lg font-semibold text-black group-hover:text-white ">Prestige
            </h3>
            <p className="mt-4 text-base text-gray-600 group-hover:text-white  ">Amet minim mollit non
              deserunt ullamco est sit aliqua dolor
              do amet sint. Velit officia consequat duis enim velit mollit.</p>
          </div>
        </a>
      </div>

    </div>
  </div>
}

export default Categorie;