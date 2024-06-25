"use client";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Breadcrumb, Flex, Input, Layout, Menu, message, theme } from "antd";
import { CohereClient } from "cohere-ai";
import { SearchProps } from "antd/es/input";
import { ChatCitation, ChatDocument } from "cohere-ai/api";

const { Header, Content, Footer, Sider } = Layout;
const { Search } = Input;

const cohere = new CohereClient({
  token: "d8Na3wRK0IaclDbOxlg9In3PNQ5OGtxzsvYvYjiB",
});

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [cardUrlsList, setCardUrlsList] = useState<any[]>([]);
  const [selectedText, setSelectedText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [renderText, setRenderText] = useState<any[]>([]);
  const [responseData, setResponseData] = useState<any[]>([]);

  interface Dictionary {
    [key: string]: any;
  }

  //citation text to doc id
  const [ref_to_doc, set_ref_to_doc] = useState<Dictionary>({});
  //doc id to url
  const [id_to_url, set_id_to_url] = useState<Dictionary>({});
  //doc id to doc
  const [id_to_doc, set_id_to_doc] = useState<Dictionary>({});

  const onSearch: SearchProps["onSearch"] = async (value, _e, info) => {
    const cohere_chat = async (input_text: any) => {
      console.log("api started");
      const response = await cohere.chat({
        message: input_text,
        // perform web search before answering the question. You can also use your own custom connector.
        connectors: [{ id: "web-search" }],
      });
      console.log("api call ended");
      setResponseData(response);
      return [response.citations, response.documents, response.text];

      // const citations = [
      //   {
      //     start: 0,
      //     end: 25,
      //     text: "Venture capitalists (VCs)",
      //     documentIds: ["web-search_3", "web-search_5"],
      //   },
      //   {
      //     start: 30,
      //     end: 39,
      //     text: "investors",
      //     documentIds: ["web-search_3", "web-search_5"],
      //   },
      //   {
      //     start: 44,
      //     end: 99,
      //     text: "provide capital to companies with high growth potential",
      //     documentIds: ["web-search_3", "web-search_5"],
      //   },
      //   {
      //     start: 119,
      //     end: 132,
      //     text: "equity stake.",
      //     documentIds: ["web-search_3", "web-search_5"],
      //   },
      //   {
      //     start: 142,
      //     end: 200,
      //     text: "not expecting repayment in the traditional sense of a loan",
      //     documentIds: ["web-search_5"],
      //   },
      //   {
      //     start: 219,
      //     end: 298,
      //     text: "receive a return on their investment through an ownership stake in the company.",
      //     documentIds: ["web-search_5"],
      //   },
      //   {
      //     start: 306,
      //     end: 327,
      //     text: "startup is successful",
      //     documentIds: ["web-search_5"],
      //   },
      //   {
      //     start: 344,
      //     end: 348,
      //     text: "exit",
      //     documentIds: ["web-search_5"],
      //   },
      //   {
      //     start: 361,
      //     end: 405,
      //     text: "acquisition or initial public offering (IPO)",
      //     documentIds: ["web-search_5"],
      //   },
      //   {
      //     start: 420,
      //     end: 490,
      //     text: "receive a portion of the proceeds based on their ownership percentage.",
      //     documentIds: ["web-search_5"],
      //   },
      //   {
      //     start: 498,
      //     end: 511,
      //     text: "startup fails",
      //     documentIds: ["web-search_5"],
      //   },
      //   {
      //     start: 517,
      //     end: 542,
      //     text: "VCs lose their investment",
      //     documentIds: ["web-search_5"],
      //   },
      //   {
      //     start: 552,
      //     end: 615,
      //     text: "entrepreneurs are not personally liable for repaying the funds.",
      //     documentIds: ["web-search_5"],
      //   },
      //   {
      //     start: 671,
      //     end: 704,
      //     text: "rapid growth in their early years",
      //     documentIds: ["web-search_1"],
      //   },
      //   {
      //     start: 706,
      //     end: 746,
      //     text: "burning through investor cash to expand.",
      //     documentIds: ["web-search_1"],
      //   },
      //   {
      //     start: 777,
      //     end: 821,
      //     text: "constricted supply and unconstrained demand.",
      //     documentIds: ["web-search_2"],
      //   },
      //   {
      //     start: 832,
      //     end: 891,
      //     text: "not many brand-name private software companies to invest in",
      //     documentIds: ["web-search_2"],
      //   },
      //   {
      //     start: 909,
      //     end: 971,
      //     text: "lot of investors looking to pour money into private companies.",
      //     documentIds: ["web-search_2"],
      //   },
      // ];
      // const text =
      //   "Venture capitalists (VCs) are investors who provide capital to companies with high growth potential in exchange for an equity stake. They are not expecting repayment in the traditional sense of a loan, but rather, they receive a return on their investment through an ownership stake in the company. If the startup is successful and achieves an exit, such as an acquisition or initial public offering (IPO), the VCs will receive a portion of the proceeds based on their ownership percentage. If the startup fails, the VCs lose their investment, and the entrepreneurs are not personally liable for repaying the funds.\n\nTech startups like Snapchat and Uber tend to focus on rapid growth in their early years, burning through investor cash to expand. They are valued highly due to constricted supply and unconstrained demand. There are not many brand-name private software companies to invest in, but there are a lot of investors looking to pour money into private companies.";
      // const documents = [
      //   {
      //     id: "web-search_3",
      //     snippet:
      //       "Home Content Repay Venture Capitalists for Your Startup\n\nRepay Venture Capitalists for Your Startup Updated: 24 Apr 2024 12 minutes\n\n1. Why You Should Repay Venture Capitalists for Your Startup?\n\n2. How Much Money Should You Repay Venture Capitalists?\n\n3. When is the Best Time to Repay Venture Capitalists?\n\n4. How to Find the Right Venture capitalist to Repay?\n\n5. What if Youcan't Repay Your Venture Capitalists?\n\n6. How Will Repaying Venture Capitalists Affect Your Business?\n\n7. The Pros and Cons of Repaying Venture Capitalists\n\n8. Case Study One Startup's Story ofRepaying Their Venture Capitalists\n\n9. FAQs AboutRepayingVenture capitalists\n\nRepay Venture Capitalists for Your Startup\n\n1. Why You Should Repay Venture Capitalists for Your Startup?\n\nCapitalists For Your Startup\n\nVenture capitalists for startup\n\nventure capitalists (VCs) play a critical role in the success of startups, providing necessary capital and expertise to help bring products to market. While\n\nstartup founders can often find success without the help of VCs, having a VC on board can provide a competitive edge that can be the\n\ndifference between success and failure.\n\nWhen it comes to repaying VCs for their investment in a startup, there is no one-size-fits-all answer. Some startups will repay VCs with a share of their profits while others may opt to pay back the original capital investment with interest. The decision ultimately depends on which repayment method is best for the startup and its investors.\n\nFor those startups that do opt to repay their VCs, there are several key benefits to doing so. First and foremost, repaying VCs helps to instill trust between the startup and investor, which is critical for any successful venture. By showing that your startup takes its commitments seriously, you're not only helping to establish trust but also demonstrating your commitment to the long-term success of your business.\n\nSecond, repaying your VCs helps to maintain a healthy relationship between you and them. When you're able to pay back the initial investment with interest, it shows that you've been using their money responsibly and are taking their financial advice seriously. This kind of relationship can be invaluable when it comes time to seek additional funding down the line or as you look to scale your business.\n\nFinally, repaying VCs can help you attract additional investments. When potential investors hear that you've been able to repay previous investors for their efforts, it can give them confidence that your business is capable of generating returns. This can make it easier for you to secure more capital in the future and further grow your business.\n\nNo matter which repayment option you choose, its important to remember that venture capitalists play an integral role in helping startups succeed. By repaying them for their investment in your company, you're not only showing appreciation for their efforts but also setting yourself up for long-term success.\n\n2. How Much Money Should You Repay Venture Capitalists?\n\nVenture capitalists (VCs) provide capital to new and growing businesses in exchange for a portion of the company's profits or equity. While venture capitalists have the potential to provide a great deal of capital to fund a business, they also come with a lot of strings attached. One of the most important questions to consider when dealing with venture capitalists is how much money should you repay them?\n\nThe answer largely depends on the nature of your agreement with the venture capitalist. Generally speaking, venture capitalists are repaid through a combination of dividends and an exit event such as an acquisition or IPO. The amount that you pay back will depend on the agreement you have in place and the performance of your business.\n\nIn some cases, venture capitalists may be repaid through a fixed return, such as a preferred rate of return or a return on their original investment. In other cases, venture capitalists may be paid back through a combination of dividends and an exit event such as an acquisition or IPO. In either case, you should be aware of what your repayment obligations are before taking on venture capital.\n\nIt is also important to consider the impact that repaying venture capitalists can have on your company's cash flow. Repaying venture capitalists can reduce available cash for operations and dampen future investment opportunities. Therefore, it is important to ensure that you are able to meet your repayment obligations without compromising your ability to fund operations or take advantage of new opportunities.\n\nIn addition to considering repayment obligations, it is also important to consider how much equity or profits you are willing to give up in exchange for venture capital financing. Venture capitalists typically ask for a significant portion of equity or profits in exchange for their investment. This means that you need to carefully weigh the value provided by the capital against the equity or profits that you are giving up.\n\nFinally, it is important to understand that venture capitalists are not charitable organizations and they expect a return on their investment. Therefore, it is important to understand the risks associated with taking on VC financing and make sure that you are able to repay them without compromising your own financial position.\n\nOverall, how much money should you repay venture capitalists depends largely on the agreement you have in place with them and the performance of your business. It is important to understand your repayment obligations before taking on VC financing and be aware of the equity or profits that you are giving up in exchange for the capital provided. Additionally, it is important to consider how repaying venture capitalists can affect your company's cash flow and future investments before entering into any agreement.\n\nLet our technical team build your MVP\n\nFasterCapital handles the MVP development process and becomes your technical cofounder!\n\n3. When is the Best Time to Repay Venture Capitalists?\n\nventure capitalists provide a valuable service to startup companies by providing them with much needed capital. This capital is used to fund the growth of the business, and in exchange, the venture capitalists usually receive an ownership stake in the company. While\n\nventure capital investments can be extremely beneficial to startups, they also come with certain expectations that need to be met. One of the most important expectations is that the startup will repay the venture capitalists at some point in the future. But when is the best time to repay venture capitalists?\n\nThe answer to this question depends on several factors, but the most important factor is the stage of development the business is in. For example, if a startup is in the very early stages and has not yet achieved significant growth or traction, it may be unwise for them to attempt to repay their venture capitalists. On the other hand, if a startup has achieved some degree of success and is looking to expand its operations, then it may be a good idea to consider paying back their venture capitalists.\n\nWhen it comes to repaying venture capitalists, timing is everything. It is important to ensure that there is sufficient cash flow available to make repayment feasible. Also, it is important to make sure that any repayment plan does not interfere with the company's ability to continue growing and investing in its future. If a\n\nstartup does not have enough cash flow available for repayment, it may be wise to wait until more funds become available before attempting to repay their venture capitalists.\n\nIn addition, it can be helpful for startups to consider the terms of their agreement with their venture capitalists before deciding when to repay them. Many venture capital agreements include provisions that specify when repayment must occur, and startups should make sure they are aware of these conditions before attempting repayment.\n\nFinally, startups should also consider their long-term goals when deciding when to repay their venture capitalists. Repaying too soon can limit a company's ability to grow and invest in its future, while waiting too long can put undue strain on their relationship with their investors. As such, it is important to consider all factors before deciding when is the best time to repay venture capitalists.\n\nOverall, there is no one-size-fits-all answer as to when is the best time to repay venture capitalists. The best course of action will depend on each individual startups specific circumstances and goals. However, by considering cash flow availability, terms of agreement with investors, and long-term goals, startups can make an informed decision about when is the best time for them to repay their venture capitalists.\n\n4. How to Find the Right Venture capitalist to Repay?\n\nfinding the right venture capitalist to repay is crucial for your startups success. Here are several\n\ntips to help you find the right venture capitalist for your startup:\n\nResearch: The first step in finding the right venture capitalist is to do your research. research different venture capitalists, their track record, and their investment style. You should also look into their background to find out if they have relevant experience in your industry. This research can be done online, through networking events, or through a\n\nventure capital firms website.\n\nNetwork: networking with other entrepreneurs and venture capitalists can be a great way to find potential venture capitalists to repay. Ask people you know in the industry if they can recommend any potential investors or if they can introduce you to someone who might be\n\ninterested in investing in your startup. Additionally,\n\nattending networking events related to your industry can help you\n\nmeet potential investors and gain\n\ninsights into the venture capital world.\n\nUnderstand Your Needs: Once you've done your research and connected with potential investors, its important to understand what you need from them. Do you need access to capital? Do you need advice on scaling your business? Are you looking for an investor who is willing to take an active role in the company? Understanding your needs will help you narrow down the list of potential investors and make sure you choose the right person for the job.\n\nKnow Your Pitch: Before approaching any venture capitalists, make sure you have a strong pitch prepared. You should be able to explain why your startup is a great investment opportunity and why its\n\nworth taking a risk on. Make sure that your pitch is concise, compelling, and well-researched. You should also focus on highlighting how you are different from other startups in order to stand out from the competition.\n\nBe Prepared: Once you've identified potential investors and created a strong pitch, its important to be prepared for meetings with them. Make sure that you have all of the necessary documentation ready so that you don't waste any time during the meeting. Additionally, be sure to ask questions about their experience investing in startups and their expectations for repayment.\n\nFollowing these tips can help you find the right venture capitalist for your startup. Keep in mind that it is important to take your time when selecting an investor and ensure that they are the right fit for your company before committing to them. Taking the time to research, network, understand your needs, craft a strong pitch, and prepare for meetings will help ensure that you select the right investor for your\n\nstartup and increase your chances of success.\n\nAs an entrepreneur you keep trying things, and I try everything. I try business ideas, on our website we test everything, iterate, iterate, iterate. Fabrice Grinda\n\n5. What if Youcan't Repay Your Venture Capitalists?\n\nWhen a startup company is unable to repay its venture capitalists, the situation can be fairly dire. In most cases, the venture capital firm will then take equity or a portion of the company's profits in exchange for their investment. This means that the founder and other shareholders will have to accept a lower stake in the company than they originally anticipated.\n\nOf course, this situation can be avoided if the startup founders are diligent in their repayment obligations. However, there may be circumstances in which a repayment becomes impossible. In such cases, it is important to understand the legal ramifications of this scenario and plan accordingly.\n\nThe first step is to understand exactly what the venture capital firm has invested in, as this will determine both their rights and the potential outcomes of the situation. Generally speaking, venture capitalists invest either in\n\nconvertible debt or equity. In the case of convertible debt, the venture capitalists are essentially loaning money to the startup and will receive repayment, plus interest, at a predetermined date. If they have invested in equity, they are buying shares in the company and will receive a return if and when the company is sold or goes public.\n\nIf a startup is unable to repay its venture capitalists, regardless of whether they have invested in debt or equity, they may be able to negotiate a new agreement with them. In some cases, this may involve offering additional shares in exchange for a reduced repayment obligation. Alternatively, they can offer equity at a discounted rate or even an ongoing percentage of future profits.\n\nIt is also important to remember that venture capitalists may not always be willing to renegotiate a repayment agreement. If this is the case, it is then important to consider other options. For example, it may be possible to attract other investors who can help pay off the venture capitalists investment. Alternatively, founders may be able to take out personal loans or raise money from friends and family in order to pay off their investors.\n\nIn summary, if a startup is unable to repay its venture capitalists it is important to understand the legal ramifications of this situation and plan accordingly. There may be options such as renegotiating repayment terms or attracting other investors which could help resolve the issue. Ultimately though, it is important for founders to consider all available options before taking any action so as to ensure that their company remains financially viable in the long term.\n\n6. How Will Repaying Venture Capitalists Affect Your Business?\n\nAffect your business\n\nIf you are an entrepreneur looking to expand or grow your business, chances are you may have considered venture capital as a source of financing.\n\nventure capital is an investment made into a business, usually by an individual or group of investors, in exchange for\n\nequity ownership in the company.\n\nAs with any form of financing, there are risks and rewards associated with venture capital. The primary\n\nbenefit of venture capital is that it can provide capital in larger amounts than traditional sources of financing. This can be particularly beneficial for businesses that have large growth potential but do not yet have the resources to finance their expansion.\n\nVenture capitalists often take an active role in managing their investments and typically expect to receive a return on their investments. This means that a business must eventually repay the venture capital it receives, and this repayment can have a significant impact on the business.\n\nRepaying venture capital can affect a business in both positive and negative ways. On the positive side, repaying venture capital shows that the business is successful and able to generate sufficient income to pay back its debt. This can be beneficial for future investments and could potentially attract additional venture capital investments.\n\nOn the other hand, repaying venture capital can also put pressure on a business. Repayments can be costly, reducing profits and leaving less money available for other investments such as research and development or marketing. Additionally, venture capitalists may require certain restrictions on how the business is managed, which could limit the ability of the business to make decisions it deems necessary for its success.\n\nWhen considering venture capital as a source of financing, it is important to be aware of both the potential benefits and risks involved. Repaying venture capital can be both beneficial and detrimental to your business, so you should carefully\n\nevaluate the pros and cons before making any decisions. You should also consider other forms of financing available to you, such as debt financing or crowdfunding, as these may be more suitable for your particular situation. Ultimately, it is important to ensure that your decision is based on a thorough understanding of all the available options and their potential impacts on your business.\n\n7. The Pros and Cons of Repaying Venture Capitalists\n\nPros and Cons of Different\n\nventure capital is an important source of financing for\n\nstartups and small businesses. It can be a crucial element in helping a business grow and succeed. But\n\nventure capitalists expect to make a return on their investments, and so its important for entrepreneurs to understand the\n\npros and cons of repaying venture capitalists.\n\nOne of the biggest benefits of repaying venture capitalists is that it can help build a strong relationship between the entrepreneur and the venture capitalist. It shows that the entrepreneur is serious about their business and is taking steps to ensure that their investment will pay off. It also boosts the venture capitalists confidence in the entrepreneurs ability to manage their business, which could lead to additional investments in the future.\n\nRepaying venture capitalists can also help a business\n\nbuild trust with its customers. Customers may be more likely to invest in a\n\nbusiness if they know that the venture capitalists have been repaid, as this demonstrates that the business is both reliable and successful. This could lead to more customers and increased profits for the business.\n\nOne of the downsides of repaying venture capitalists is that it can be difficult to do so when a business is still in its early stages. Many startups are not generating enough profits to pay back their investors, so they may have to take on additional debt or use other sources of financing. This can be risky for entrepreneurs, as it could leave them in debt if their business does not succeed.\n\nRepaying venture capitalists can also be expensive, as venture capitalists typically charge high rates of interest on their investments. This means that entrepreneurs may have to pay back more than they borrowed, which could eat into their profits or even cause them to go into debt if their business does not generate enough income. This can be a significant risk for entrepreneurs and should be carefully considered before taking out a loan from a venture capitalist.\n\nIn addition, repaying venture capitalists can limit an entrepreneurs ability to reinvest in their business. When a business repays its investors, it has less money available for capital investments or other expenses related to growth. This could limit an entrepreneurs ability to expand their operations or pursue new opportunities.\n\nRepaying venture capitalists can have both pros and cons for entrepreneurs. It can help\n\nbuild trust between an entrepreneur and their investors, as well as with customers, but it can also be costly and may limit an entrepreneurs ability to reinvest in their business. Entrepreneurs should carefully consider all of these factors before deciding whether or not to repay their venture capitalists.\n\nIf you want to build a startup that has a good chance of succeeding, don't listen to me. Listen to Paul Graham and others who are applying tons of data to the idea of startup success. That will maximize your chance of being successful. Michael Arrington\n\n8. Case Study One Startup's Story ofRepaying Their Venture Capitalists\n\nA case study of one startup's story of repaying their venture capitalists is a unique and inspiring tale of success. The startup, called XYZ, was founded in 2020 by a small team of entrepreneurs. Their primary goal was to develop and market a revolutionary new product that would revolutionize the way people interact with each other.\n\nThe team quickly identified the need for external funding to grow the business and make their vision a reality. As such, they decided to\n\napproach venture capitalists for backing. After months of negotiations and due diligence, the team was able to secure a $5 million\n\ninvestment from two venture capital firms.\n\nWith the funds in hand, XYZ began to scale up their operations and develop their product. After months of hard work and dedication, the product was eventually released to the public. It immediately gained traction in the market and quickly became one of the most popular products in its industry.\n\nHowever, despite the success of the product, XYZ still needed to repay their investors. The team had to carefully balance their finances in order to make sure they could pay back the venture capitalists in full. This meant cutting back on expenses in order to make sure they had enough cash flow to pay back the investment.\n\nFortunately, XYZ was able to successfully repay their venture capitalists in full within two years. This success was due in part to the sound financial decisions made by the team as well as their dedication and hard work. The repayment was also helped along by the immense popularity of their product which allowed them to generate more revenue than anticipated.\n\nThe success of XYZ serves as an inspirational example of what can be achieved when a startup works hard and has access to venture capital financing. It proves that even though there are risks involved with taking on venture capital investments, it can be manageable if done right. In addition, it demonstrates that even with limited resources, a passionate team can still achieve great success if they are able to\n\nidentify market opportunities and execute on them effectively.\n\nOverall, XYZ's story is one of hard work, dedication, and success. It serves as an inspiring reminder that even with limited resources, great things can be achieved when you have access to venture capital funding and a passionate team that's willing to work hard and make smart decisions.\n\n9. FAQs AboutRepayingVenture capitalists\n\nFAQs About Repaying Venture Capitalists\n\nStarting a business is a daunting process, and many entrepreneurs rely on venture capital to get their businesses off the ground. Repaying venture capitalists is a critical part of the process, and many entrepreneurs have questions about how to go about it. Here are some of the most commonly asked questions about repaying venture capitalists.\n\nWhat Is a Typical Repayment Structure?\n\nVenture capitalists typically structure repayments as a combination of cash payments and equity, depending on the terms of your agreement. Cash payments are usually made in the form of dividends, while equity is distributed in the form of stock or options. The repayment schedule will vary depending on the agreement, but its typically a combination of regular\n\npayments with a lump sum at the end of the term.\n\nIf you cant repay your venture capitalists, they may be willing to renegotiate the terms of your agreement. This could include extending the payment period, reducing the interest rate, or offering additional equity in exchange for a reduced repayment amount. Depending on the severity of the situation, venture capitalists may also be willing to take a loss on their investment.\n\nHow Can I Minimize My Risk When Repaying Venture Capitalists?\n\nThe best way to minimize your risk when repaying venture capitalists is to make sure you have a solid business plan in place. Make sure you have realistic goals and you're prepared to make adjustments if necessary. Additionally, make sure you have enough\n\ncash flow to cover your repayment obligations. Finally, make sure you keep your venture capitalists informed throughout the repayment process.\n\nWhat Are Some Strategies for Repaying Venture Capitalists Quickly?\n\nOne of the best strategies for repaying venture capitalists quickly is to focus on increasing your revenues as quickly as possible. Invest in marketing efforts that will drive more sales, and look for opportunities to cut costs where possible. Additionally, consider taking on additional investments to help cover repayment costs. Finally, make sure you keep your venture capitalists informed of any changes in your\n\nrepayment schedule so they can adjust their expectations accordingly.\n\nRepaying venture capitalists is an important part of starting a business, and its important to understand all aspects of the process. Make sure you have a realistic repayment plan in place, and focus on increasing revenues and cutting costs where possible. Additionally, be open to renegotiating terms if necessary and keep your venture capitalists informed throughout the repayment process. With these tips in mind, you should be able to successfully repay your\n\nventure capitalists in no time.\n\nBuild your product with half of the costs only!\n\nFasterCapital helps in prototyping, designing, and building your product from A to Z while covering 50% of the costs!\n\nPremiums: Unveiling the Secrets of Underwriting Income and Premiums update\n\nUnderstanding the Basics of Underwriting Income and Premiums When it comes to insurance, there are...\n\nBlog marketing: Maximizing ROI: A Comprehensive Approach to Blog Marketing\n\nIn the realm of digital marketing, the strategic use of blogs can be a game-changer for businesses...\n\nMarket order: Executing Market Orders Based on Session Price Analysis\n\nMarket orders are one of the most straightforward types of orders in trading. They are orders to...\n\nDecision making: Empowering Decision Making with Core Competencies\n\nEffective decision-making is crucial for success in both personal and professional settings. It is...\n\nGreen technology development: From Idea to Impact: Building a Green Tech Startup\n\nIn the journey of a green tech startup, the inception phase is pivotal. It's where a mere spark of...\n\nMarketability Research: How to Do Marketability Research for Your Product or Service\n\n1. Understanding Marketability: - Definition: Marketability...\n\nEvent value proposition and differentiation: Maximizing ROI: How Event Value Proposition Impacts Startup Success\n\nIn the competitive landscape of startup events, the ability to articulate a compelling value...\n\nASIPs: Customizable Processors for Tailored Computing Solutions\n\n1. Introduction to ASIPs: Customizable Processors for Tailored Computing Solutions As technology...\n\nExpense recording: Expense Recording Strategies for Marketing Professionals\n\nMarketing professionals face many challenges in their daily work, such as managing campaigns,...",
      //     timestamp: "2024-05-12T22:01:22",
      //     title: "Repay Venture Capitalists for Your Startup - FasterCapital",
      //     url: "https://fastercapital.com/content/Repay-Venture-Capitalists-for-Your-Startup.html",
      //   },
      //   {
      //     id: "web-search_5",
      //     snippet:
      //       'Please fill out this field.\n\nWhat Is a Venture Capitalist?\n\nUnderstanding Venture Capitalists\n\nVenture Capital Structure\n\nVC Expected Returns on a Deal\n\nExample of a VC Deal\n\nAlternative Investments\n\nVenture Capitalists Definition: Who Are They and What Do They Do?\n\nUpdated June 10, 2024\n\nReviewed by Charlene Rhinehart Full Bio\n\nCharlene Rhinehart is a CPA , CFE, chair of an Illinois CPA Society committee, and has a degree in accounting and finance from DePaul University.\n\nLearn about our Financial Review Board\n\nFact checked by Skylar Clarine Full Bio\n\nSkylar Clarine is a fact-checker and expert in personal finance with a range of experience including veterinary technology and film studies.\n\nLearn about our editorial policies\n\nWhat Is a Venture Capitalist?\n\nA venture capitalist (VC) is a private equity investor who provides capital to companies with high growth potential in exchange for an equity stake. VC investments typically involve funding startup ventures or small companies that wish to expand but don\'t have access to the equities markets.\n\nA venture capitalist (VC) is an investor who provides young companies with capital in exchange for equity.\n\nStartups often turn to VCs for funding to scale up and bring their products to the market.\n\nBecause of the uncertainties of investing in unproven companies, venture capitalists tend to experience high rates of failure.\n\nHowever, the rewards are significant for those investments that do pan out.\n\nSome of the most well-known venture capitalists are Jim Breyer, an early investor in Facebook, and Peter Fenton, an investor in X (formerly Twitter).\n\nInvestopedia / Joules Garcia\n\nUnderstanding Venture Capitalists\n\nVenture capital firms are usually formed as limited partnerships (LPs), where the partners invest in the VC fund. A committee is generally tasked with making investment decisions. Once promising emerging growth companies are identified, the pooled investor capital funds them in exchange for a sizable equity stake.\n\nContrary to common belief, VCs do not typically fund a startup at its outset. Instead, they target firms that generate revenue and need more funding to commercialize their ideas. The VC fund will buy a stake in these firms, nurture their growth, and look to cash out with a strong return on investment.\n\nVenture capitalists typically look for companies with a strong management team, a large potential market, and a distinctive product or service with a solid competitive advantage. They also look for prospects in industries with which they are familiar or have expertise while having the chance to buy a large percentage of the company so they can influence its direction.\n\nVCs are willing to risk investing in such companies because they can earn a massive return on their investments if they are successful. However, VCs have high rates of failure because of the uncertainty involved with new and unproven companies. Below are the company stages and a chart of recent American VC funding.\n\nTypical Company Stages\n\nCompany formation, business model development\n\nFamily, friends, public assistance, incubators, accelerators\n\nFirst capital contribution to the company\n\nBusiness angels, public grants, crowdfunding, priming funds\n\nThe company begins to scale\n\nSpecialized private capital funds\n\nExpansion into new markets, increased revenue\n\nGrowth capital funds\n\nResale of the company or initial public offering (IPO)\n\nStrategic buyers (large companies), public markets (IPO)\n\nVenture capitalists can be involved in any of these stages, but are usually focused on the startup and growth stages, as we can see from the chart below of recent U.S. VC funding..\n\nVenture Capital Structure\n\nHigh-net-worth individuals (HNWI), insurance companies, pension funds, foundations, and corporate pension funds may pool money in a fund controlled by a VC firm. The venture capital firm acts as the general partner (GP), while the other companies or individuals are LPs. All partners have part ownership of the fund.\n\nThe roles within a venture capital firm vary, but they can be broken down into roughly three positions:\n\nAssociates: These individuals usually come to VC firms with experience in either business consulting or finance and, sometimes, degrees in business. They tend to analyze business models, industry trends, and sectors. They also work on a firm\'s portfolio. Although they do not make critical decisions, associates may introduce promising companies to the firm\'s upper management.\n\nPrincipals: A principal is a midlevel professional. They usually serve on the boards of portfolio companies and ensure that they run without significant hiccups. Principals are also responsible for identifying prospects for VC firms and negotiating terms for acquisition and exit. Principals are on a "partner track" that depends on the returns they generate.\n\nPartners: Higher profile partners primarily identify areas or specific businesses to invest in, approve deals (whether investments or exits), occasionally sit on the board of portfolio companies, and represent their VC firms.\n\nVC firms control a pool of various investors\' money, unlike angel investors, who use their own money.\n\nVenture capitalists must follow regulations in conducting their business. The U.S. Securities and Exchange Commission regulates private equity firms and venture capitalists.\n\nVenture capital fund managers are paid management fees and carried interest. Depending on the firm, about 20% of the profits are paid to the company managing the private equity fund, while the rest goes to the LPs invested in the fund. General partners are usually due an additional 2% fee.\n\nHistory of Venture Capital\n\nThe history of individuals and firms investing in high-risk and high-reward ventures is centuries old—it\'s hard to imagine the history of shipping, whaling, and colonialism without it. However, the U.S.\'s first modern venture capital firms started in the mid-20th century. Georges Doriot, a Frenchman who moved to the U.S. to get a business degree, became an instructor at Harvard\'s business school and worked at an investment bank. In 1946, he became president of the American Research and Development Corporation (ARDC), the first publicly funded venture capital firm.\n\nARDC was remarkable in that, for the first time, a startup could raise money from private sources other than wealthy families. Before, new companies generally looked to the likes of the Rockefellers or Vanderbilts for the capital they needed to grow. ARDC soon had millions in its accounts from educational institutions and insurers. ARDC alums founded firms such as Morgan Holland Ventures and Greylock Partners.\n\nThe VC firm, as the GP, controls where the money is invested. Investments are usually in businesses or ventures that most banks or capital markets avoid due to the high degree of risk.\n\nStartup financing began to resemble the modern-day venture capital industry after the passage of the Investment Act of 1958. The act enabled small business investment companies to be licensed by the Small Business Administration, which had been established five years earlier.\n\nBy its nature, venture capital invests in new businesses with excellent growth potential but enough risk to be sidelined by banks with various requirements about what kinds of ventures they can support with loans. Fairchild Semiconductor, one of the earliest and most successful semiconductor companies, was the first venture capital-backed startup, setting a pattern for venture capital\'s close relationship with emerging technologies in the San Francisco, California, area.\n\nVenture capital firms in that region and period also established the standard practices that are still used today. They set up limited partnerships to hold investments, with professionals acting as general partners. Those supplying the capital would serve as passive partners with more limited control. The number of independent venture capital firms increased in the following decade, prompting the founding of the National Venture Capital Association in 1973.\n\nVenture capital has since grown into a hundred-billion-dollar industry. Today, well-known venture capitalists include Jim Breyer, an early Facebook (META) investor, Peter Fenton, an early investor in X, and Peter Thiel, the co-founder of PayPal (PYPL).\n\nThe record-setting value of all U.S. venture capital investments in 2021. The following years returned to pre-2021 norms, with 2023 at half that figure, at about $129 billion in VC funding.\n\nVC Expected Returns on a Deal\n\nVenture capitalists usually invest in startups with the expectation of making a significant return on their investment. The structure of the expected return is based on the high risk associated with investing in early-stage companies and the potential for high rewards if the startup succeeds.\n\nVCs typically aim for a return of at least ten times their initial investment over five to seven years. If a VC invests $5 million in a startup, it would expect to receive at least $50 million upon a successful exit, such as an acquisition or an initial public offering (IPO).\n\nHowever, VC returns often follow a power-law distribution, where a small number of highly successful investments (known as "home runs") generate the most of a fund\'s returns. In contrast, others break even or post losses. To achieve their target returns, VCs construct a portfolio of investments, diversifying across different sectors, stages, and geographies. They expect that out of a typical portfolio of at least 10 to 20 investments, something like the following will occur:\n\nOne to two investments will be "home runs," returning more than 10 times the initial investment.\n\nTwo to three investments will have moderate success, returning two-and-a-half to five times the initial investment.\n\nFour to five investments will only return the initial capital or generate a small profit.\n\nFour to five or more investments will fail, resulting in a partial or total loss of the invested capital.\n\nBy diversifying their portfolio and aiming for a few home runs, VCs can achieve their overall fund return targets of 20% to 30% annually, even with a high failure rate among their investments.\n\nOf course, VC returns are not guaranteed and are subject to various risks, such as market conditions, competition, and execution challenges faced by the startups they invest in. In addition, VC investments are illiquid since investor capital is typically locked up for several years until an exit opportunity arises.\n\nPros & Cons of Venture Capital\n\nVCs can provide substantial amounts of capital to help startups grow quickly and scale their operations.\n\nVCs can give valuable strategic guidance and mentorship to founders.\n\nVCs have strong professional networks that can help startups connect with potential partners, customers, and talent.\n\nSecuring funding from respected VCs can provide validation and credibility for a startup.\n\nVCs are often willing to take a long-term view on their investments, allowing startups to focus on growth and innovation rather than short-term profits.\n\nIn exchange for funding, founders typically give up a significant part of their company\'s equity and control to VCs.\n\nVCs expect rapid growth and high returns on their investments, which can put intense pressure on founders to meet aggressive targets.\n\nVCs may prioritize their own financial interests over the success of the company, leading to conflicts with founders.\n\nDespite VC backing, startups often fail, and founders may end up with little to no ownership in the company they built.\n\nVC investments are illiquid-with the money typically locked up for several years.\n\nExample of a VC Deal\n\nSuppose ABC Inc., a tech startup, has been growing rapidly and is looking to raise $5 million in series A funding to expand its team, invest in product development, and scale its marketing efforts.\n\nThe founders of ABC pitch their business to several venture capital firms and receive interest from VC Firm XYZ. After due diligence and negotiations, XYZ agrees to lead the series A round and invest $3 million, with other investors contributing the remaining $2 million.\n\nThe terms of the deal are as follows:\n\nValuation: Startup ABC is valued at $20 million pre-money (before the investment). With the entire $5 million investment, the post-money valuation is $25 million.\n\nEquity: VC firm XYZ receives 12% of the company\'s equity ($3 million divided by $25 million) in Series A preferred stock. The other investors collectively receive 8% ($2 million divided by $25 million), leaving the founders and employees with the remaining 80%.\n\nBoard seats: XYZ receives one seat on ABC\'s board of directors, giving it a say in major strategic decisions.\n\nLiquidation preferences: The Series A preferred stock comes with a liquidation preference, meaning that if there\'s a sale or company failure, series A investors will receive their initial investment back before the common stockholders (founders, employees, future outside shareholders).\n\nMilestones and tranches: If the company attains certain milestones, such as revenue targets or product launch dates, the funding may be released in tranches.\n\nAfter the deal closes, ABC\'s founders will use the funds to hire additional software engineers, expand its sales and marketing teams, and invest in new product features. XYZ provides guidance and introduces the founders to potential partners and customers.\n\nAs ABC continues to grow, it may raise additional rounds of funding (series B, C, etc.) at higher valuations, with XYZ potentially participating in these rounds to maintain its ownership stake. The ultimate goal for both the founders and investors is to achieve a successful exit through an acquisition or an IPO, providing a return on investment for the VCs and a payout for the founders and employees.\n\nHow Do Venture Capitalists Make Money?\n\nVenture capitalists usually raise money for their funds from various outside sources, such as institutional investors (pension funds, endowments, and foundations), corporations, family offices, and high-net-worth individuals. These investors are known as limited partners, and they commit capital to the VC fund for a specific period, usually 10 to 12 years. The VC firm, which consists of the investment professionals managing the fund, is known as the general partner.\n\nWhat\'s the Difference Between a Venture Capitalist and an Angel Investor?\n\nVCs are professional investors who typically manage a fund of pooled investment capital from various sources, such as institutions and high-net-worth individuals. They usually invest millions of dollars into a portfolio of more mature startups with proven traction.\n\nAngel investors, meanwhile, are usually high-net-worth individuals who invest their own money as seed capital for early-stage startups, often in smaller amounts (tens to hundreds of thousands of dollars). Angel investors typically get involved earlier in a startup\'s life cycle and are more hands-on in providing guidance and mentorship.\n\nMust Entrepreneurs Pay Venture Capitalists Back?\n\nEntrepreneurs are not required to pay back venture capitalists in the traditional sense of a loan repayment or contractual obligation. Instead, VCs receive a return on their investment through an ownership stake in the company. If the startup is successful and achieves an exit, such as an acquisition or IPO, the VCs will receive a part of the proceeds based on their ownership percentage. If the startup fails, the VCs lose their investment, and the entrepreneurs are not personally liable for repaying the funds.\n\nWhat Percentage of VC Funds are Successful?\n\nThe success rate varies widely, but it is generally accepted that a significant portion of funds do not achieve their target returns. According to some industry reports, only about 5% of VC funds generate 95% of the industry\'s returns. A 2023 study by Cambridge Associates found that the 20-year annualized average return for VC funds was 12.33% compared with 12.40% for the MSCI All-Country World Index of global stocks. Meanwhile, research from Harvard Business School suggests that as many as 75% of venture-backed companies never return cash to investors.\n\nVCs are investors who form limited partnerships to pool investment funds. They use that money to fund startup companies in return for equity stakes in those companies. VCs usually make their investments after a startup has been generating revenue rather than in its initial stage.\n\nVC investments can be vital to startups because their business concepts are typically unproven and pose too much risk for traditional funding providers. While most VC ventures lose money, the profits from their "home runs" should outpace these losses for a fund to be successful.\n\nInvestopedia requires writers to use primary sources to support their work. These include white papers, government data, original reporting, and interviews with industry experts. We also reference original research from other reputable publishers where appropriate. You can learn more about the standards we follow in producing accurate, unbiased content in our editorial policy.\n\nB. Guilhon. "Venture Capital and the Financing of Innovation," Pages 4-9. John Wiley & Sons, 2020.\n\nU.S. Securities and Exchange Commission. "Private Funds."\n\nTom Nicholas. "VC: An American History," Pages 41-51. Harvard University Press, 2019.\n\nHarvard Business School, Baker Library Historical Collections. "Georges F. Doriot."\n\nCambridge Historical Society. "Innovation in Cambridge."\n\nSmall Business Administration. "Small Business Investment Act of 1958."\n\nFairchild Semiconductors. "History of Fairchild."\n\nU.S. Securities and Exchange Commission. "Speech by SEC Staff: The Future of Securities Regulation."\n\nNational Venture Capital Association. "NVCA Celebrates 50 Years of Empowering the Entrepreneurial Ecosystem."\n\nNational Venture Capital Association. "About Us."\n\nNational Venture Capital Association. "PitchBook-NVCA Venture Monitor Q4 2023," Page 6.\n\nKruze Consulting. "WHAT ARE YOUR VC’S RETURN EXPECTATIONS DEPENDING ON THE STAGE OF INVESTMENT?"\n\nS. Mallaby. "The Power Law: Venture Capital and the Art of Disruption," Pages 1-12. Allen Lane, 2022.\n\nHarvard Business Review. "How Venture Capital Works."\n\nForbes. "20 VCs Capture 95% Of VC Profits: Implications For Entrepreneurs & Venture Ecosystems."\n\nCambridge Associates. "US VENTURE CAPITAL INDEX AND SELECTED BENCHMARK STATISTICS." P. 3.\n\nFast Company. "Why Most Venture-Backed Companies Fail."\n\nTake the Next Step to Invest\n\nAdvertiser Disclosure\n\nThe offers that appear in this table are from partnerships from which Investopedia receives compensation. This compensation may impact how and where listings appear. Investopedia does not include all offers available in the marketplace.\n\nTake the Next Step to Invest\n\nAdvertiser Disclosure\n\nThe offers that appear in this table are from partnerships from which Investopedia receives compensation. This compensation may impact how and where listings appear. Investopedia does not include all offers available in the marketplace.\n\nWhat Is Venture Capital?\n\nVenture capital is money, technical, or managerial expertise provided by investors to startup firms with long-term growth potential. more\n\nLiquidity Event: What It Is and How It Works\n\nA liquidity event is an event that allows early investors in a company to cash out some or all of their equity. more\n\nPrivate Equity Explained With Examples and Ways to Invest\n\nPrivate equity is an alternative investment class that invests in or acquires private companies that are not listed on a public stock exchange. more\n\nVenture Capital Funds: Definition for Investors and How It Works\n\nVenture capital funds invest in early-stage companies and help get them off the ground through funding and guidance, aiming to exit at a profit. more\n\nEquity Meaning: How It Works and How to Calculate It\n\nEquity typically refers to shareholders\' equity, which represents the residual value to shareholders after debts and liabilities have been settled. more\n\ntZero: Meaning, History, and Regulation\n\ntZero is a technology company that uses blockchain tech to run its broker-dealer business. It specializes in private capital markets and connecting startups with private equity. more\n\nWhat Is Venture Capital?\n\nPrivate Equity vs. Venture Capital: What\'s the Difference?\n\nLiquidity Event: What It Is and How It Works\n\nPrivate Equity Explained With Examples and Ways to Invest\n\nVenture Capital Funds: Definition for Investors and How It Works\n\nGrasp the Accounting of Private Equity Funds\n\nYour Privacy Choices\n\nInvestopedia is part of the Dotdash Meredith publishing family.\n\nBy clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.\n\nCookies Settings Accept All Cookies',
      //     timestamp: "2024-06-16T22:57:05",
      //     title:
      //       "Venture Capitalists Definition: Who Are They and What Do They Do?",
      //     url: "https://www.investopedia.com/terms/v/venturecapitalist.asp",
      //   },
      //   {
      //     id: "web-search_1",
      //     snippet:
      //       "US Markets Loading... h m s\n\nFrom Snap to Uber, here are 9 billion-dollar tech companies that still aren't profitable\n\nAaron Holmes 2019-11-27T13:53:00Z\n\nFacebook Email Twitter LinkedIn Copy Link\n\nUber CEO Dara Khosrowshahi. Johannes Eisele/Contributor/Getty\n\nThis story is available exclusively to Business Insider subscribers.\u0014 Become an Insider and start reading now. Have an account? Log in.\n\nMany of the world's most valuable tech startups have never been profitable, raising billions of dollars from investors while still losing money every year.\n\nTech startups typically focus on rapid growth in their early years, burning through investor cash in order to expand.\n\nMassive brands like Uber, Snapchat, and Spotify are among those that have yet to make a profit.\n\nWall Street is becoming more accepting of this startup model — investors are willing to tolerate negative cash flows for increasingly long periods of time.\n\nVisit Business Insider's homepage for more stories.\n\nSign up to get the inside scoop on today’s biggest stories in markets, tech, and business — delivered daily. Read preview\n\nThanks for signing up!\n\nAccess your favorite topics in a personalized feed while you're on the go. download the app\n\nEarlier this year, Snapchat surpassed 200 million daily active users, a milestone for the social media startup. Now, eight years after its founding, Snap — the company that owns the photo-sharing app — is hoping to achieve another milestone: it might start making money.\n\nSnap is just one of many tech companies worth billions of dollars that has never turned a profit. Instead, these startups pour money raised from investors back into growth, losing money yearly.\n\nThis story is available exclusively to Business Insider subscribers.\u0014 Become an Insider and start reading now. Have an account? Log in.\n\nInvestors stay on the hook in the hopes that the companies will one day become profitable, allowing them to cash out. This has worked for some startups — Facebook first turned a profit five years after it was founded, and boosted its profits to $6.9 billion last year. Amazon, founded in 1994, didn't make a profit until 2001, and was relatively light on profits until recently.\n\nBut while startups frequently aim to convince investors that they're the next Facebook or Amazon, such success stories are rare, and questionable paths to profitability can doom startups. WeWork's attempt at going public in September failed after investors were unconvinced by the company's plan to turn around its cash-burning trajectory.\n\nNonetheless, investment data shows that backers are increasingly willing to support startups that remain unprofitable for long periods of time.\n\nA Pitchbook report published earlier this year showed that, of 100 startups worth more than $1 billion to successfully complete an initial public offering since 2010, 64% were unprofitable. Last year, unprofitable companies that went public fared better than profitable ones, according to Recode.\n\nHere are nine companies that are valued in the billions despite not being profitable.\n\nThe logo of messaging app Snapchat is seen at a booth at TechFair LA, a technology job fair, in Los Angeles, California, U.S., January 26, 2017. Lucy Nicholson/Reuters\n\nCurrent valuation: $21.7 billion\n\nNet loss in 2018: $1.3 billion\n\nA Snap spokesperson did not respond to Business Insider's request for comment.\n\nCurrent valuation: $8.38 billion\n\nNet loss in 2018: $119.9 million \n\nA Zillow spokesperson did not respond to a request for comment.\n\nAn advertisement for the Square payment processor is seen outside a vendors site along the High Line in New York Reuters\n\nCurrent valuation: $29.6 billion\n\nNet loss in 2018: $38.46 million\n\nA Square spokesperson did not respond to a request for comment.\n\nMario Tama/Getty Images\n\nCurrent valuation: $50.4 billion\n\nNet loss in 2018: $1.8 billion\n\nAn Uber spokesperson did respond to a request for comment.\n\nFILE PHOTO: The Lyft Driver Hub is seen in Los Angeles Reuters\n\nCurrent valuation: $14.59 billion\n\nNet loss in 2018: $911 million \n\nA Lyft spokesperson highlighted that in the company's third quarter 2019 earnings report, CEO Logan Green said Lyft expects to be profitable by the fourth quarter of 2021.\n\nCurrent valuation: $10.9 billion\n\nNet loss in 2018: $63 million\n\nWhile Pinterest has never had a profitable year, it did achieve profitability in the third quarter of 2019, it noted in a shareholder letter.\n\nFILE PHOTO: WeWork offices in San Francisco Reuters\n\nCurrent valuation: $4.9 billion\n\nNet loss in 2018: $1.6 billion \n\nA WeWork spokesperson did not respond to a request for comment.\n\nFILE PHOTO: The Spotify logo hangs on the facade of the New York Stock Exchange with U.S. and a Swiss flag as the company lists it's stock with a direct listing in New York Reuters\n\nCurrent valuation: $25.8 billion\n\nNet loss in 2018: $78 million \n\nA Spotify spokesperson did not respond to a request for comment.\n\nTesla co-founder and CEO Elon Musk introduces the newly unveiled all-electric battery-powered Tesla Cybertruck at Tesla Design Center in Hawthorne, California on November 21, 2019. FREDERIC J. BROWN/AFP via Getty Images\n\nCurrent valuation: $59.3 billion\n\nNet loss in 2018: $976 million \n\nA Tesla spokesperson did not respond to a request for comment.",
      //     timestamp: "2024-05-30T12:42:30",
      //     title:
      //       "From Snap to Uber, here are 9 billion-dollar tech companies that still aren't profitable",
      //     url: "https://www.businessinsider.com/tech-companies-worth-billions-unprofitable-tesla-uber-snap-2019-11",
      //   },
      //   {
      //     id: "web-search_2",
      //     snippet:
      //       "This is a BETA experience. You may opt-out by clicking here\n\nNov 28, 2023,01:05am ESTDecarbonizing Heavy Transportation: Quantron's Michael Perschke On Pioneering Hydrogen Solutions\n\nNov 20, 2023,01:59am ESTBridging The Digital Divide In The AI Era - The UNDP Way\n\nOct 15, 2023,01:36pm EDTBig Tech Ramps Up Content Moderation Amid EU Pressure\n\nOct 10, 2023,01:34pm EDTSpain's Successful Miura 1 Launch Reignites Europe's Hopes For Space Exploration\n\nOct 7, 2023,02:39am EDTUNESCO And The Netherlands Launch Initiative To Ensure Ethical Oversight Of AI\n\nSep 23, 2023,04:47am EDTEurope's Bid To Become A Semiconductor Superpower\n\nSep 14, 2023,01:00am EDTPegasus Spyware Scandals Highlight Global Dangers As Activists Demand Action\n\nSep 11, 2023,11:36am EDTUK Finally Rejoins EU Research Programs—But At A Price\n\nForbesInnovationConsumer Tech\n\nWhy Do Companies Like Snapchat And Uber Have Such Insanely High Valuations?\n\nOpinions expressed by Forbes Contributors are their own.\n\nClick to save this article.\n\nYou'll be asked to sign into your Forbes account.\n\nAug 19, 2016,11:12am EDT\n\nThis article is more than 7 years old.\n\nLONDON, ENGLAND - AUGUST 03: The Snapchat app logo is displayed on an iPhone on August 3, 2016 in... [+] London, England. (Photo by Carl Court/Getty Images)\n\nWhy do apps like Snapchat, Whatsapp, Uber, Airbnb, Dropbox require so much funding and have such a high valuation? originally appeared on Quora: the knowledge sharing network where compelling questions are answered by people with unique insights.\n\nAnswer by Fred Stevens-Smith, CEO of Rainforest QA, YC S12, YC application reviewer, on Quora:\n\nThere's a tendency for humans to scorn things we don't understand. Sadly, this is the way it is with the technology economy. So let's unpack the question and see that the huge funding rounds and valuations that we're seeing are completely logical.\n\nWhy do apps like XYZ require so much funding?\n\nThere are two answers to this question.\n\nYou know the commonly-held belief that it's cheap to create a software business today? It's true! You know what is also true? It's really expensive to scale a business—any business. Once the company has found product market fit, it goes into land-grab mode. All of the companies mentioned were in land-grab mode when they raised their rounds.\n\nBecause they can. Who doesn't want more cash reserves? After all, startups only die because they run out of money. As the CEO of a company, if you're offered $500m at minimal dilution (aka high valuation) it's usually a prudent decision to extend your runway and take the money.\n\nWhy do apps like XYZ have such a high valuation?\n\nIt can help to see valuation as a price. So just like any other good, a high price is the product of limited supply, exceptional demand, or both.\n\nSo high valuations (prices) for these companies are a logical product of:\n\nConstricted supply. There are not many 'brand name' private software companies to invest in.\n\nUnconstricted demand. There are a lot of investors looking to pour money into private companies.\n\nDigging into both is probably interesting, but outside of the scope of this question.\n\nThis question originally appeared on Quora. Ask a question, get a great answer. Learn from experts and access insider knowledge. You can follow Quora on Twitter, Facebook, and Google+. More questions:\n\nMobile Applications: What is the best way to optimize performance testing of mobile apps?\n\nStartups: What are some interesting startups in the lead generation space?\n\nVenture Capital: How does venture capital work?\n\nReprints & Permissions",
      //     timestamp: "2023-11-30T17:44:38",
      //     title:
      //       "Why Do Companies Like Snapchat And Uber Have Such Insanely High Valuations?",
      //     url: "https://www.forbes.com/sites/quora/2016/08/19/why-do-companies-like-snapchat-and-uber-have-such-insanely-high-valuations/",
      //   },
      // ];
      // return [citations, documents, text];
    };

    const [citations, documents, text] = await cohere_chat(value);
    let tmp_id_to_url: Dictionary = {};
    let tmp_id_to_doc: Dictionary = {};
    let tmp_ref_to_doc: Dictionary = {};

    if (documents && citations) {
      for (let i = 0; i < documents.length; i++) {
        if (tmp_id_to_url[documents[i]["id"]]) {
          tmp_id_to_url[documents[i]["id"]].push(documents[i]["url"]);
        } else {
          tmp_id_to_url[documents[i]["id"]] = [documents[i]["url"]];
        }
        tmp_id_to_doc[documents[i]["id"]] = documents[i]["snippet"];
      }
      for (let i = 0; i < citations.length; i++) {
        tmp_ref_to_doc[citations[i]["text"]] = citations[i].documentIds;
      }
    }
    set_id_to_url(tmp_id_to_url);
    set_id_to_doc(tmp_id_to_doc);
    set_ref_to_doc(tmp_ref_to_doc);

    const string_segment = (text: string) => {
      const arr = [];
      let k = 0;
      if (citations) {
        for (let i = 0; i < citations.length; i++) {
          const start = citations[i]["start"];
          const end = citations[i]["end"];
          arr.push(text.substring(k, start));
          arr.push(
            <mark className="bg-sky-200 hover:bg-sky-300 cursor-pointer rounded">
              {text.substring(start, end)}
            </mark>
          );
          k = end;
        }
      }
      return arr;
    };
    let arr = string_segment(text);
    setRenderText(arr);
  };

  const handleClick = (e) => {
    // Your event handler logic
    const urls = [];
    const text = e.target.innerText;
    const doc_ids = ref_to_doc[text];
    console.log(ref_to_doc);
    console.log(responseData);
    if (!doc_ids) {
      return;
    }

    for (let i = 0; i < doc_ids.length; i++) {
      urls.push([doc_ids[i], id_to_url[doc_ids[i]]]);
    }
    setCardUrlsList(urls);
    setSelectedText(text);

    console.log(renderText);

    navigator.clipboard.writeText(text);
    messageApi.info("references found");
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb
            items={[
              {
                title: "Home",
              },
              {
                title: <a href="">Application List</a>,
              },
              {
                title: "An Application",
              },
            ]}
          />
          <div>
            <Search
              placeholder="input search text"
              onSearch={onSearch}
              style={{ width: 600 }}
              defaultValue="top chinese news"
            />
          </div>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              fontSize: 16,
            }}
          >
            <div className="selection:bg-fuchsia-300 selection:text-fuchsia-900">
              <p className="m-8" onClick={handleClick}>
                {renderText}
              </p>
              {Object.values(id_to_url).length > 0 && (
                <p>{Object.values(id_to_url).length} references found</p>
              )}
              <p>
                {Object.values(id_to_url).map((elem) => (
                  <li>{elem}</li>
                ))}
              </p>
              <Flex justify="space-between" align="start" vertical>
                {cardUrlsList.map((elem, index) => {
                  return (
                    <Flex justify="space-evenly" align="center" vertical>
                      <p className="m-4">
                        <a
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          href={elem[1]}
                          target="_blank"
                        >
                          {elem[1]}
                        </a>
                      </p>
                      <p className="m-8">{id_to_doc[elem[0]]}</p>
                    </Flex>
                  );
                })}
              </Flex>
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
