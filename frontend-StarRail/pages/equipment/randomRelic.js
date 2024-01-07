import React, { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/Layout";


export default function randomRelic() {
  
  const [relicType, setRelicType] = useState("");
  const [relicCount, setRelicCount] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [mainRelicType, setMainRelicType] = useState("");
  const [randomSubValue, setRandomSubValue] = useState({});

  
  const handleRelicType = (event) => {
    setRelicType(event.target.value);
  };
  const handleSubAttributeCount = (event) => {
    setRelicCount(event.target.value);
  };
  const handleSubAttributeChange = (attribute, isChecked) => {
    if (isChecked) {
      if (selectedAttributes.length < parseInt(relicCount, 10)) {
        setSelectedAttributes((prev) => [...prev, attribute]);
      }
    } else {
      setSelectedAttributes((prev) =>
        prev.filter((attr) => attr !== attribute)
      );
    }
  };
  useEffect(() => {
    if (!relicCount) {
      setSelectedAttributes([]);
    }
  }, [relicCount]);
  useEffect(() => {
    setMainRelicType("");
  }, [relicType]);
  useEffect(() => {
    const newRandomVal = { ...randomSubValue };
    selectedAttributes.forEach((attr) => {
      if (!randomSubValue[attr]) {
        const findVal = relicSubMainValue[attr];
        const randomVal = findVal[Math.floor(Math.random() * 3)];
        newRandomVal[attr] = randomVal;
      }
    });
    Object.keys(randomSubValue).forEach((attr) => {
      if (!selectedAttributes.includes(attr)) {
        delete newRandomVal[attr];
      }
    });
    setRandomSubValue(newRandomVal);
  }, [selectedAttributes]);


  const mainAttributeOptions = {
    feet: ["攻击力", "速度", "防御力", "生命力"],
    body: [
      "攻击力",
      "防御力",
      "生命力",
      "暴击",
      "暴击伤害",
      "效果命中",
      "治疗加成",
    ],
  };

  const subMainAttributeOptions = {
    subAttribute: [
      "攻击",
      "速度",
      "防御",
      "生命",
      "攻击力",
      "暴击",
      "防御力",
      "生命力",
      "暴击伤害",
      "击破特攻",
      "效果命中",
      "效果抵抗",
    ],
  };
  const relicMainValue = {
    攻击: "56",
    生命: "112.8",
    生命力: "6.91%",
    攻击力: "6.91%",
    防御力: "8.64%",
    暴击: "5.18%",
    暴击伤害: "10.37%",
    治疗加成: "5.53%",
    效果命中: "6.91%",
    速度: "4",
  };
  const relicSubMainValue = {
    攻击: ["17", "19", "21"],
    生命: ["34", "38", "42"],
    防御: ["17", "19", "21"],
    生命力: ["3.46%", "3.89%", "4.32%"],
    攻击力: ["3.46%", "3.89%", "4.32%"],
    防御力: ["4.32%", "4.86%", "5.4%"],
    暴击: ["2.59%", "2.92%", "3.24%"],
    暴击伤害: ["5.18%", "5.83%", "6.48%"],
    击破特攻: ["5.18%", "5.83%", "6.48%"],
    效果命中: ["3.46%", "3.89%", "4.32%"],
    效果抵抗: ["3.46%", "3.89%", "4.32%"],
    速度: ["2", "2.3", "2.6"],
  };
  const renderMainAttribute = () => {
    if (relicType in mainAttributeOptions) {
      return (
        <div>
          <select
            name="mainAttribute"
            onChange={(event) => setMainRelicType(event.target.value)}
            value={mainRelicType}
          >
            <option value="">请选择</option>
            {mainAttributeOptions[relicType].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    }
  };

  const renderSubMainAttribute = () => (
    <div>
      {subMainAttributeOptions.subAttribute
        .filter((attribute) => attribute !== mainAttribute)
        .map((attribute, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`attr-${index}`}
              name="subAttribute"
              value={attribute}
              checked={selectedAttributes.includes(attribute)}
              onChange={(e) =>
                handleSubAttributeChange(attribute, e.target.checked)
              }
              disabled={
                !relicCount ||
                (selectedAttributes.length >= parseInt(relicCount, 10) &&
                  !selectedAttributes.includes(attribute))
              }
            />
            <label htmlFor={`attr-${index}`}>{attribute}</label>
          </div>
        ))}
    </div>
  );
  const displayReport = () => {
    const mainAttribute =
      relicType === "head"
        ? "生命"
        : relicType === "hand"
        ? "攻击"
        : mainRelicType;

    const displayMainAttribute = mainAttribute ? `${mainAttribute}:` : "";
    const mainAttributeValue =
      mainAttribute in relicMainValue ? relicMainValue[mainAttribute] : "";

    return (
      <div>
        <h2>主词条：</h2>
        <p>{`${displayMainAttribute}${mainAttributeValue}`}</p>
        <h2>副词条：</h2>
        <ul>
          {selectedAttributes.map((attr, index) => (
            <li key={index}>{`${attr}: ${randomSubValue[attr]}`}</li>
          ))}
        </ul>
      </div>
    );
  };

  const mainAttribute =
    relicType === "head"
      ? "生命"
      : relicType === "hand"
      ? "攻击"
      : mainRelicType;

  return (
    <Layout>
      <Head>
        <title>遗器强化模拟器</title>
      </Head>
      <h1>请选择遗器类型</h1>
      <select onChange={handleRelicType}>
        <option value="">请选择</option>
        <option value="hand">手</option>
        <option value="head">头</option>
        <option value="feet">鞋</option>
        <option value="body">衣服</option>
      </select>
      <h1>请选择初始主词条和副词条</h1>
      <hr />
      <h2>主词条：</h2>
      {renderMainAttribute()}
      <p>{mainAttribute}</p>
      <h2>副词条数量:</h2>
      <select onChange={handleSubAttributeCount}>
        <option value="">请选择</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
      <h2>请选择副词条属性</h2>
      {renderSubMainAttribute()}
      <h2>您生成的遗器是：</h2>
      <div className="report">{displayReport()}</div>
      
    </Layout>
  );
}
