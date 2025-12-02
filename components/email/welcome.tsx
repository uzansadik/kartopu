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
} from '@react-email/components';

interface KoalaWelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const WelcomeEmail = ({ userFirstname }: KoalaWelcomeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>
        Üyelik işleminiz başarıyla tamamlandı! Kartopu.net ailesine hoş
        geldiniz.
      </Preview>
      <Container style={container}>
        <Img
          src={`${baseUrl}/static/koala-logo.png`}
          width='170'
          height='50'
          alt='Koala'
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Hoş geldiniz! Kartopu.net ailesine katıldığınız için teşekkür ederiz.
          Artık portföyünüzü kolayca yönetebilir ve gider takiplerinizi
          yapabilirsiniz.
        </Text>
        <Section style={btnContainer}>
          <Button style={button} href='https://kartopu.net'>
            Başlayın
          </Button>
        </Section>
        <Text style={paragraph}>
          Saygılarımızla,
          <br />
          Kartopu.net Ekibi
        </Text>
        <Hr style={hr} />
        <Text style={footer}>Kartopu.net 2025, Tüm hakları saklıdır.</Text>
      </Container>
    </Body>
  </Html>
);

WelcomeEmail.PreviewProps = {
  userFirstname: 'Alan',
} as KoalaWelcomeEmailProps;

export default KoalaWelcomeEmailProps;

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
};

const logo = {
  margin: '0 auto',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
};

const btnContainer = {
  textAlign: 'center' as const,
};

const button = {
  backgroundColor: '#5F51E8',
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px',
};

const hr = {
  borderColor: '#cccccc',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
};
