import React, { useEffect } from "react";
import IPage from "../interfaces/page";
import logging from "../config/logging";
// @ts-ignore
import { Content, Box, Media, Image } from "reactbulma";

const HomePage: React.FunctionComponent<IPage> = (props) => {
  useEffect(() => {
    logging.info(`Loading ${props.name} page.`);
  }, [props.name]);

  return (
    <div className="column is-three-fifths is-offset-one-fifth">
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            Hello! I am
            <h1 className="title is-1">Jorge Fernando Zabala Rueda</h1>
            <h2 className="subtitle is-3">Full Stack Web Developer</h2>
          </div>
        </div>
      </section>
      <br/><br/>
      <Box>
        <Media>
          <Media.Left>
            <Image is="64x64" src="images/profile-photo.jpg" alt="Image" />
          </Media.Left>
          <Media.Content>
            <Content>
              <strong>About me</strong>{" "}
              <p>
                Web developer with more than <strong>10 years</strong> of
                well-rounded experience in the field of
                <strong> Computer Science</strong>, extensive knowledge of
                modern Web techniques and love for <strong>Coffee</strong>.
                Looking for an opportunity to work and upgrade.
              </p>
              <hr/>
            </Content>
          </Media.Content>
        </Media>
      </Box>
    </div>
  );
};

export default HomePage;
