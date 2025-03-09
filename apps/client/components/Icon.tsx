import React from "react";

interface IconProps {
  size?: "default" | "large";
}

const Icon = ({ size = "default" }: IconProps) => {
  if (size === "large") {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="57" height="63" viewBox="0 0 57 63" fill="none">
        <path
          d="M1.53474 48.0949C0.58857 47.5567 0.00272575 46.5427 0.00262393 45.4428L1.32753e-08 17.0976C-0.000103113 15.9836 0.600637 14.9586 1.56585 14.4261L27.0408 0.370028C27.947 -0.129979 29.0431 -0.12284 29.9429 0.38893L55.4652 14.9051C56.4114 15.4433 56.9972 16.4573 56.9973 17.5572L57 45.9024C57.0001 47.0164 56.3994 48.0414 55.4341 48.5739L29.9592 62.63C29.053 63.13 27.9569 63.1228 27.0571 62.6111L1.53474 48.0949Z"
          className="fill-primary"
        />
        <path
          d="M32.9624 22.5107L28.6304 41.1599C28.5435 41.5005 28.3589 41.7772 28.0765 41.9901C27.816 42.203 27.5119 42.3095 27.1645 42.3095H25.992C25.6663 42.3095 25.3731 42.2137 25.1125 42.0221C24.852 41.8305 24.6675 41.5856 24.5589 41.2876L24.4285 40.8725C24.1462 39.9996 23.8206 38.9884 23.4514 37.8388C23.104 36.6892 22.7349 35.4864 22.344 34.2303C22.3222 34.1452 22.2679 34.1026 22.1811 34.1026C22.116 34.1026 22.0726 34.1452 22.0509 34.2303C21.7468 35.167 21.4537 36.1037 21.1714 37.0405C20.8891 37.9559 20.6286 38.7861 20.3896 39.5313C20.1726 40.2764 19.9879 40.8618 19.836 41.2876C19.7491 41.5644 19.5646 41.8092 19.2823 42.0221C19.0216 42.2137 18.7285 42.3095 18.4028 42.3095H17.1976C16.8502 42.3095 16.5353 42.203 16.253 41.9901C15.9925 41.7772 15.8296 41.5005 15.7645 41.1599L11.4325 22.5107C11.3669 22.1895 11.4003 21.8743 11.5326 21.5651C11.6216 21.3569 11.7684 21.1773 11.9525 21.0482C12.0477 20.9815 12.1458 20.9261 12.2468 20.8821C12.4422 20.7757 12.6593 20.7225 12.8982 20.7225H13.8102C14.1576 20.7225 14.4616 20.8289 14.7222 21.0418C15.0044 21.2547 15.1891 21.5208 15.2759 21.8401L17.9143 33.4C17.9359 33.4639 17.9902 33.4958 18.077 33.4958C18.2271 33.4958 18.2933 33.3254 18.334 33.1789C18.3661 33.0636 18.4107 32.9031 18.4679 32.6975C18.6199 32.2291 18.8153 31.6118 19.0543 30.8454C19.2931 30.0577 19.5646 29.1848 19.8685 28.2268C20.1726 27.2688 20.4766 26.3002 20.7805 25.3209C20.8891 25.0228 21.0628 24.778 21.3016 24.5864C21.5406 24.3735 21.8337 24.2671 22.1811 24.2671C22.5502 24.2671 22.8543 24.3735 23.0931 24.5864C23.3536 24.778 23.5275 25.0335 23.6143 25.3528L26.0541 33.1811C26.0993 33.3263 26.1675 33.4958 26.3176 33.4958C26.4046 33.4958 26.4588 33.4639 26.4805 33.4C26.7628 32.144 27.0451 30.8986 27.3274 29.6638C27.6097 28.4291 27.8703 27.2795 28.1091 26.215C28.3697 25.1506 28.5869 24.2351 28.7606 23.4687C28.9343 22.7023 29.0537 22.1595 29.1189 21.8401C29.2058 21.5208 29.3795 21.2547 29.64 21.0418C29.9223 20.8289 30.2372 20.7225 30.5846 20.7225H31.4966C31.7355 20.7225 31.9526 20.7757 32.148 20.8821C32.3435 20.9673 32.5172 21.095 32.6691 21.2653C32.9732 21.6485 33.0708 22.0637 32.9624 22.5107Z"
          className="fill-primary-foreground"
        />
        <path
          d="M45.2797 40.8405C45.2797 41.245 45.1386 41.5963 44.8563 41.8943C44.574 42.1711 44.2265 42.3095 43.814 42.3095H39.254C38.2552 42.3095 37.3975 41.9688 36.6809 41.2876C35.9859 40.5851 35.6385 39.7335 35.6385 38.7329V22.1914C35.6385 21.7656 35.7797 21.4144 36.062 21.1376C36.3443 20.8608 36.6917 20.7225 37.1042 20.7225H38.0162C38.4289 20.7225 38.7763 20.8608 39.0586 21.1376C39.3626 21.4144 39.5146 21.7656 39.5146 22.1914V25.3847C39.5146 25.6402 39.6557 25.7679 39.938 25.7679H43.814C44.2265 25.7679 44.574 25.917 44.8563 26.215C45.1386 26.4918 45.2797 26.843 45.2797 27.2688V28.131C45.2797 28.43 45.1834 28.7144 44.9908 28.9843C44.9073 29.1013 44.8036 29.2028 44.6857 29.2838C44.41 29.4733 44.1195 29.568 43.814 29.568H39.938C39.6557 29.568 39.5146 29.7171 39.5146 30.0151V38.1262C39.5146 38.4029 39.6557 38.5413 39.938 38.5413H43.814C44.2265 38.5413 44.574 38.6797 44.8563 38.9565C45.1386 39.2332 45.2797 39.5845 45.2797 40.0103V40.8405Z"
          className="fill-primary-foreground"
        />
      </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="38" height="42" viewBox="0 0 38 42" fill="none">
      <path
        d="M1.02316 32.0633C0.39238 31.7045 0.00181716 31.0284 0.00174929 30.2952L8.85023e-09 11.3984C-6.8742e-05 10.6557 0.400425 9.97242 1.0439 9.61738L18.0272 0.246686C18.6313 -0.0866524 19.3621 -0.0818933 19.9619 0.259287L36.9768 9.93674C37.6076 10.2955 37.9982 10.9716 37.9982 11.7048L38 30.6016C38.0001 31.3443 37.5996 32.0276 36.9561 32.3826L19.9728 41.7533C19.3687 42.0867 18.6379 42.0819 18.0381 41.7407L1.02316 32.0633Z"
        className="fill-primary"
      />
      <path
        d="M21.9749 15.0072L19.0869 27.4399C19.029 27.667 18.9059 27.8515 18.7177 27.9934C18.544 28.1354 18.3413 28.2063 18.1097 28.2063H17.328C17.1109 28.2063 16.9154 28.1424 16.7417 28.0147C16.568 27.887 16.445 27.7238 16.3726 27.5251L16.2857 27.2483C16.0975 26.6664 15.8804 25.9923 15.6343 25.2259C15.4027 24.4595 15.1566 23.6576 14.896 22.8202C14.8815 22.7634 14.8453 22.7351 14.7874 22.7351C14.744 22.7351 14.7151 22.7634 14.7006 22.8202C14.4979 23.4447 14.3025 24.0692 14.1143 24.6936C13.9261 25.3039 13.7524 25.8574 13.5931 26.3542C13.4484 26.8509 13.3253 27.2412 13.224 27.5251C13.1661 27.7096 13.0431 27.8728 12.8549 28.0147C12.6811 28.1424 12.4857 28.2063 12.2686 28.2063H11.4651C11.2335 28.2063 11.0236 28.1354 10.8354 27.9934C10.6617 27.8515 10.5531 27.667 10.5097 27.4399L7.62165 15.0072C7.57796 14.793 7.6002 14.5828 7.68838 14.3767C7.74776 14.238 7.84563 14.1182 7.96836 14.0322C8.03181 13.9877 8.09719 13.9508 8.16451 13.9214C8.2948 13.8505 8.43956 13.815 8.5988 13.815H9.2068C9.43842 13.815 9.64109 13.8859 9.81481 14.0279C10.0029 14.1698 10.126 14.3472 10.1839 14.5601L11.9429 22.2667C11.9573 22.3093 11.9935 22.3306 12.0514 22.3306C12.1514 22.3306 12.1955 22.2169 12.2227 22.1193C12.244 22.0424 12.2738 21.9354 12.312 21.7983C12.4133 21.4861 12.5436 21.0745 12.7029 20.5636C12.8621 20.0384 13.0431 19.4566 13.2457 18.8179C13.4484 18.1792 13.6511 17.5334 13.8537 16.8806C13.9261 16.6819 14.0419 16.5187 14.2011 16.3909C14.3604 16.249 14.5558 16.1781 14.7874 16.1781C15.0335 16.1781 15.2362 16.249 15.3954 16.3909C15.5691 16.5187 15.685 16.689 15.7429 16.9019L17.3694 22.1207C17.3996 22.2175 17.445 22.3306 17.5451 22.3306C17.6031 22.3306 17.6392 22.3093 17.6537 22.2667C17.8419 21.4293 18.0301 20.5991 18.2183 19.7759C18.4065 18.9527 18.5802 18.1863 18.7394 17.4767C18.9131 16.767 19.0579 16.1568 19.1737 15.6458C19.2895 15.1349 19.3691 14.773 19.4126 14.5601C19.4705 14.3472 19.5863 14.1698 19.76 14.0279C19.9482 13.8859 20.1581 13.815 20.3897 13.815H20.9977C21.157 13.815 21.3017 13.8505 21.432 13.9214C21.5623 13.9782 21.6781 14.0633 21.7794 14.1769C21.9821 14.4324 22.0472 14.7091 21.9749 15.0072Z"
        className="fill-primary-foreground"
      />
      <path
        d="M30.1865 27.227C30.1865 27.4967 30.0924 27.7309 29.9042 27.9296C29.716 28.1141 29.4844 28.2063 29.2094 28.2063H26.1693C25.5034 28.2063 24.9316 27.9792 24.4539 27.5251C23.9906 27.0567 23.759 26.489 23.759 25.822V14.7943C23.759 14.5104 23.8531 14.2762 24.0413 14.0917C24.2295 13.9072 24.4611 13.815 24.7361 13.815H25.3441C25.6192 13.815 25.8508 13.9072 26.039 14.0917C26.2417 14.2762 26.343 14.5104 26.343 14.7943V16.9232C26.343 17.0935 26.4371 17.1786 26.6253 17.1786H29.2094C29.4844 17.1786 29.716 17.278 29.9042 17.4767C30.0924 17.6612 30.1865 17.8954 30.1865 18.1792V18.754C30.1865 18.9533 30.1223 19.1429 29.9939 19.3228C29.9382 19.4009 29.8691 19.4685 29.7905 19.5225C29.6067 19.6489 29.413 19.712 29.2094 19.712H26.6253C26.4371 19.712 26.343 19.8114 26.343 20.0101V25.4175C26.343 25.602 26.4371 25.6942 26.6253 25.6942H29.2094C29.4844 25.6942 29.716 25.7865 29.9042 25.971C30.0924 26.1555 30.1865 26.3897 30.1865 26.6735V27.227Z"
        className="fill-primary-foreground"
      />
    </svg>
  );
};

export default Icon;
