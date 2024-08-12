import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  userFirstname: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const EmailTemplate = ({ userFirstname }: EmailTemplateProps) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: "#007291",
          },
        },
      },
    }}
  >
    <div
      className="max-w-4xl pt-10 flex flex-col mx-auto"
      suppressHydrationWarning
    >
      <Preview>
        The sales intelligence platform that helps you uncover qualified leads.
      </Preview>
      <div className="" style={main}>
        <div style={container}>
          <Text style={paragraph}>Hi XYZ{userFirstname},</Text>
          <Text className="text-justify" style={paragraph}>
            Erat vero dolore diam sed takimata sit rebum, sanctus vero kasd et
            duo dolor. Magna stet tempor sed ipsum dolore diam magna, ea magna
            nonumy ea amet accusam no. Rebum vero kasd justo et clita labore
            dolor ea et, labore. Erat vero dolore diam sed takimata sit rebum,
            sanctus vero kasd et duo dolor. Magna stet tempor sed ipsum dolore
            diam magna, ea magna nonumy ea amet accusam no. Rebum vero kasd
            justo et clita labore dolor ea et, labore. Erat vero dolore diam sed
            takimata sit rebum, sanctus vero kasd et duo dolor. Magna stet
            tempor sed ipsum dolore diam magna, ea magna nonumy ea amet accusam
            no. Rebum vero kasd justo et clita labore dolor ea et, labore.
          </Text>
          <Section style={btnContainer}>
            <Button
              className="max-w-xs mx-auto mt-5 rounded-xl"
              style={button}
              href="https://getkoala.com"
            >
              Get started
            </Button>
          </Section>
          <Text style={paragraph}>
            Best,
            <br />
            The Koala team
          </Text>
          <Text style={footer}>your entered address is placed here</Text>
          <Hr style={hr} />
          <Text style={footer}>
            This email has been sent using{" "}
            <a
              className="text-blue-500 underline"
              target="_blank"
              href="https://thepaypage.me/"
            >
              @thapaypage
            </a>
          </Text>
        </div>
      </div>
    </div>
  </Tailwind>
);

EmailTemplate.PreviewProps = {
  userFirstname: "Alan",
} as EmailTemplateProps;

export default EmailTemplate;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
