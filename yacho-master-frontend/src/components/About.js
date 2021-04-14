import React from "react";
import { useTranslation } from "react-i18next";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const About = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Card>
        <CardContent>
          {t("about.para1")}{" "}
          <ul>
            <li>
              <a href="https://fullstackopen.com/en/">Full Stack Open 2021</a>
            </li>
            <li>
              <a href="https://github.com/Anna-M-Thomas/yacho-master">
                Yacho Master github
              </a>
            </li>
          </ul>
          {t("about.para2")}
          <ul>
            <li>
              <a href="https://www.xeno-canto.org/article/153">
                Xeno-canto API
              </a>
            </li>
            <li>
              <a href="https://www.flickr.com/services/api/">Flickr API</a>
            </li>
          </ul>
          {t("about.para3")}
          <ul>
            <li>
              <a href="https://www.xeno-canto.org/">Xeno-canto</a>
            </li>
            <li>
              {t("about.aboutcc")}{" "}
              <a href="https://creativecommons.jp/licenses/">JP</a>{" "}
              <a href="https://creativecommons.org/share-your-work/">EN</a>
            </li>
          </ul>
        </CardContent>
      </Card>
    </main>
  );
};

export default About;
