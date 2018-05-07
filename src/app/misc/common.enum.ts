//===============================================================================
// © 2018 xxx Apps.  All rights reserved.
// Original Author: Saurabh
// Original Date: xxx
//==============================================================================

/// <summary>
  ///  Defines Operation Type for employee directory application.
  /// </summary>
  export enum OperationType {

    None = 0,

    Get = 1,

    Add = 2,

    Update = 3,

    Delete = 4,

}


export enum RequesterType {
  Other = 1,
  WC = 2,
  I_Phone = 3,
  I_Pad = 4,
  Android = 5
}

export enum AlertType {
  SupportAlertEmail = 1,
  EnggAlertEmail = 2
}


export enum ServiceName {
  Authentication = 1,
  Notification = 2,
  ED = 3,
  Chat = 4,
  Utils = 5,
  Sync = 6,
  ThumbnailUrls = 9
}


export enum EDNotificationEventNumber  {

    /// <summary>
    /// None Status
    /// </summary>
    None = 0,

    /// <summary>
    /// On My Favorites Status Update.
    /// </summary>
    OnMyFavoritesStatusUpdate = 1,

    /// <summary>
    /// On My Department Member Status Update.
    /// </summary>
    OnMyDepartmentMemberStatusUpdate = 2,

    /// <summary>
    /// On My Location Member Status Update.
    /// </summary>
    OnMyLocationMemberStatusUpdate = 4,

    /// <summary>
    /// On My Team Member Status Update.
    /// </summary>
    OnMyTeamMemberStatusUpdate = 8,

    /// <summary>
    /// On My Favorites Profile Update.
    /// </summary>
    OnMyFavoritesProfileUpdate = 16,

    /// <summary>
    /// On My Department Members Change.
    /// </summary>
    OnDepartmentProfileUpdate = 32,

    /// <summary>
    /// On My Location Members Change.
    /// </summary>
    OnLocationProfileUpdate = 64,

    /// <summary>
    /// The on my team member change.
    /// </summary>
    OnTeamProfileUpdate = 128,

    /// <summary>
    /// DepartmentProfileUpdate
    /// </summary>
    OnMyDepartmentMembersChange = 256,

    /// <summary>
    /// LocationProfileUpdate
    /// </summary>
    OnMyLocationMembersChange = 512,

    /// <summary>
    /// TeamProfileUpdate
    /// </summary>
    OnMyTeamMembersChange = 1024,

    /// <summary>
    /// My Favorites Has Birthday.
    /// </summary>
    MyFavoritesHasBirthday = 2048,

    /// <summary>
    /// I Am Assigned As Manager.
    /// </summary>
    IAmAssignedAsManager = 4096,

    /// <summary>
    /// On New Chat Message Received.
    /// </summary>
    NewPostToMe = 8192,

    /// <summary>
    /// I Mentioned As In Chat.
    /// </summary>
    SomeoneLikesMyPost = 16384,

    /// <summary>
    /// TaskDueToday
    /// </summary>
    MyTaskDueToday = 32768,

    /// <summary>
    /// TaskDueTomorrow
    /// </summary>
    MyTaskDueTomorrow = 65536,

    /// <summary>
    /// I Am Added To Chat Room.
    /// </summary>
    ReceivedNewChatMessage = 131072,

    /// <summary>
    /// Mention in message
    /// </summary>
    Mention = 262144,

    /// <summary>
    /// All Status.
    /// </summary>
    All = OnMyFavoritesStatusUpdate | OnMyDepartmentMemberStatusUpdate | OnMyLocationMemberStatusUpdate |
    OnMyTeamMemberStatusUpdate | OnMyFavoritesProfileUpdate | IAmAssignedAsManager
       | MyFavoritesHasBirthday | NewPostToMe |
       SomeoneLikesMyPost | ReceivedNewChatMessage | OnDepartmentProfileUpdate |
        OnLocationProfileUpdate | OnTeamProfileUpdate | OnMyDepartmentMembersChange | OnMyLocationMembersChange |
       OnMyTeamMembersChange | MyTaskDueToday | MyTaskDueTomorrow | Mention

    }
