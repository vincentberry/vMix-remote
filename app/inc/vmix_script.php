<div id="VmixScript" style="display: none;">
        ' ---------------------------------------------------
        ' -------------------- VMIX REMOTE ------------------
        ' ------ VERSION 1a 2324 (C) BY VINCENT BERRY -------
        ' --https://github.com/vincentberry/vmix-remote------
        ' ---------------------------------------------------  
        Dim userurl As String = "<p id="urlserverscriptmvix"></p>/api/api"
        Dim session_delay As String = "30000"
        Dim random As New Random()
        dim useraccountcode AS String = random.Next(1, 999999999).ToString()
        Console.WriteLine("la session vmix est n°")
        Console.WriteLine(useraccountcode)
        ' ---------------------------------------------------
        Dim ScriptLength As String = "FFA5"
        Dim dummy As String = "none"
        Dim u As String = "xml"
        Dim p As String = "pvmix"
        Do While True
                Dim stateon As String = "NOTCONNECTED"
                Dim state As String = "CONNECTED"
                Dim xml As String = API.XML()
                Dim W As New Net.WebClient
                Dim NC As New System.Collections.Specialized.NameValueCollection
                NC.Add("xml",xml)
                Dim R As String
                Dim con As String = userurl
                NC.Add("connector",useraccountcode)
                NC.Add("session_delay",session_delay)
                NC.Add("STATE",state)
                Dim RESP As Byte()
                Dim docXml As New XmlDocument()
                Dim conected As String = userurl & p & u
                Try
                        RESP = W.UploadValues(con, NC)
                        R = System.Text.Encoding.UTF8.GetString(RESP)
                        Dim rawCommand As string = R

                        docXml.LoadXml(R)
                        Dim XmlNode As XmlNode = docXml.DocumentElement

                        ' Diviser la chaîne en un tableau en utilisant |serpare| comme délimiteur

                        Dim command As Object
                        For Each command In XmlNode.SelectNodes("/commands/command")

                                'Console.WriteLine(command.SelectSingleNode("functionType").InnerText)
                                Dim functionType As String = command.SelectSingleNode("functionType").InnerText
                                Dim inputParam As String = command.SelectSingleNode("inputParam").InnerText
                                Dim valueParam As String = command.SelectSingleNode("valueParam").InnerText
                                Dim durationParam As String = command.SelectSingleNode("durationParam").InnerText
                                Dim selectedNameParam As String = command.SelectSingleNode("selectedNameParam").InnerText
                                Dim selectedIndexParam As String = command.SelectSingleNode("selectedIndexParam").InnerText

                                API.Function(functionType, Input:=inputParam, Value:=valueParam, Duration:=durationParam, selectedName:=selectedNameParam, selectedIndex:=selectedIndexParam)

                                If functionType = "session_delay" Then
                                        session_delay = valueParam
                                        Console.WriteLine("Update delay: " & session_delay)
                                End If

                        Next command

                Catch ex As Exception
                        Console.WriteLine("Error: " & ex.Message)
                End Try

                Dim StringValue As String = conected & userurl & R
                sleep(session_delay)
        Loop
        ' ---------------------------------------------------
        ' -------------------- VMIX REMOTE ------------------
        ' ------ VERSION 1a 2324 (C) BY VINCENT BERRY -------
        ' --https://github.com/vincentberry/vmix-remote------
        ' ---------------------------------------------------

</div>