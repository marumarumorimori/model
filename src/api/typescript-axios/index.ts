// tslint:disable
/**
 * Pecori
 * # 新卒研修 Pecori のAPI仕様 ## 認証 - リクエストヘッダーに`X-PecoriToken: {トークン}`を含めてトークンを送信。 - X-PecoriToken ヘッダで送信するトークンは、`/login` APIのレスポンスから取得する。  ## 共通エラー一覧 全APIが返す可能性のある共通エラーを以下に示す。   なお、各APIが返却する可能性のあるエラーは各APIのレスポンス例を確認すること  <table>   <thead>     <tr>       <th>HTTP Status Code</th>       <th>code</th>       <th>description</th>       <th>発生条件</th>     </tr>   </thead>   <tbody>     <tr>       <td>500</td>       <td>1</td>       <td>接続に失敗しました</td>       <td>API の処理で何らかの例外が発生した時</td>     </tr>     <tr>       <td>500</td>       <td>2</td>       <td>接続に失敗しました</td>       <td>DBに接続できなかったとき</td>     </tr>     <tr>       <td>500</td>       <td>3</td>       <td>接続に失敗しました</td>       <td>DBからデータを取得できなかったとき(取得件数0の場合は除く)</td>     </tr>     <tr>       <td>401</td>       <td>4</td>       <td>再度ログインしてください</td>       <td>アクセストークンが無効・なにかしら不正だった場合</td>     </tr>     <tr>       <td>400</td>       <td>5</td>       <td>入力されたデータに誤りがあります</td>       <td>         必須となっているパラメータに値が入っていなかったとき<br>         またはパラメータに入っている値が予期しないものであったとき       </td>     </tr>   </tbody> </table> 
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


export * from "./api";
export * from "./configuration";
