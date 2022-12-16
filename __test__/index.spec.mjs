import test from "ava";

import { runfmt } from "../index.js";

test("format sql", (t) => {
  let target = `
  SELECT
  ID  AS DATA_ID     -- ID
 , CODE AS DATA_CODE    -- コード
 , NAME AS DATA_NAME    -- 名称
 , VALUE1 AS VALUEAAAAAAAAAAAAAAAA
 , VALUE2 -- 値2
 , (
   SELECT
    VALUE3
   FROM
    TABLE2
  )   -- サブクエリ
 FROM
  TABLE1
 WHERE
  ID  = 'DUMMY'  -- IDが'DUMMY'
 AND VAL1 = 1 -- VAL1が1
 AND CODE = 42 -- CODEが42
 OR VALUE2 = /*LONGLONGLONGLONG_BIND_PARAMETER*/42 
  `;
  let dst = `SELECT
	ID		AS	DATA_ID					-- ID
,	CODE	AS	DATA_CODE				-- コード
,	NAME	AS	DATA_NAME				-- 名称
,	VALUE1	AS	VALUEAAAAAAAAAAAAAAAA
,	VALUE2	AS	VALUE2					-- 値2
,	(
		SELECT
			VALUE3
		FROM
			TABLE2
	)		AS	(
		SELECT
			VALUE3
		FROM
			TABLE2
	)						-- サブクエリ
FROM
	TABLE1
WHERE
	ID		=	'DUMMY'									-- IDが'DUMMY'
AND	VAL1	=	1										-- VAL1が1
AND	CODE	=	42										-- CODEが42
OR	VALUE2	=	/*LONGLONGLONGLONG_BIND_PARAMETER*/42
`;
  t.is(runfmt(target), dst);
});
